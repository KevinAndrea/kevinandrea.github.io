const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Superscript digits
const SUPERS = ["\u2070", "\u00B9", "\u00B2", "\u00B3", "\u2074", "\u2075", "\u2076", "\u2077", "\u2078", "\u2079"];

const OPTS = ["Tutorial", "Test"];
const TYPES = ["Single-Page", "Multi-Page"];
const STYPES = ["Simplified", "Realistic"];
const MENUHWID = 40;    // Half the width of text buttons
const MOFFSET = 100;    // Offset value for specifying selecting menu options
const LINEHEI = 30;     // Vertical offset to display subsequent lines of text
const VEQPCHANCE = 0.8; // Chance that physical and virtual address sizes are equal
const TIMESTEPS = 16;   // Steps/frames in an animated transition
const PAUSE = 30;       // Steps/frames to show text temporarily
const CHDIST = 20;      // Distance between displayed bits
const ANIMSPD = 2;      // Speed of constant-speed animations

// If the canvas size is changed to a number that isn't a multiple of four, cast these
// to integers
const HCWID = canvas.width / 2;
const QCWID = canvas.width / 4;
const TQCWID = 3 * QCWID;
const HCHEI = canvas.height / 2;
const QCHEI = canvas.height / 4;
const TQCHEI = 3 * QCHEI;

// These are based on real values
// 64-bit works, but is a bit intimidating and tedious to type in all the characters
// const ADDRMIN = 24, ADDRMAX = 64;
const ADDRMIN = 24, ADDRMAX = 32; // Bounds for the number of bits in an address
const SADDRMIN = 20, SADDRMAX = 26;
const PWIDMIN = 9, PWIDMAX = 20; // Bounds for lg of page size
const SPWIDMIN = 8, SPWIDMAX = 16;
//const ENTMAX = 64;
const ENTMAX = 32; // Max bits in a page table entry

// Yes, apparently mapping larger virtual addresses to smaller physical addresses was a
// thing. The 80386SX uses 32-bit addresses internally, but has a 24-bit address bus and
// a built-in MMU that uses page tables.

// "Simplified" version has a few changes:
// 1. Page table entries don't have a size.
// 2. Entries are accessed by index instead of address. The first entry should not be
//   called "entry at (address of page table)".
// 3. Page tables are also accessed by index instead of address. 
// 4. Virtual and physical addresses are the same size.
// 5. Address widths are smaller.

// Note: For "fillText", the Y position is the line that the text is on, the text will
// appear ABOVE the given position.

// States:
//  0: Main menu
//  1: Transition from main menu
//  2: Transition to main menu
//  3: Test 1
//  4: Test 1->
//  5: Test 2
//  6: Test 2->
//  7: Test 3
//  8: Test 3->
// 20 - 31: Tutorial

var state = 0;      // The current state
var nstate = 0;     // The next state
var mvpos = 0;      // Timer for constant animations
var mx = 0, my = 0; // The current mouse position
var mpos = 0;       // The currently moused-over menu item
var type = 0;       // The currently selected type
var stype = TYPES.length + 1; // The currently selected simplification type
var clk = 0;        // Timer for transition animations
var qans = 0;       // The correct answer, may be a BigInt
var marks = "";     // The player's current incorrect marks

var vawid = 0;  // Virtual address width
var pawid = 0;  // Physical address width
//var psize = 0; // Page size
var pswid = 0;  // Lg of page size
var pesize = 0; // Page table entry size
var ptbase = 0; // Page table base address, BigInt
var inaddr = 0; // Input virtual address, BigInt
var entry = 0;  // Entry in page table, BigInt

var sindwid = 0; // Width of second-level page table indexes
var sptbase = 0; // Second-level page table base address, BigInt

// Number of entries in a table: pnum = 2 ^ (vawid - lg(psize)) = (2 ^ vawid) / psize
// Size of a page table is pnum * pesize
// vawid = lg(pnum) + lg(psize)

// Rules:
// 1. pawid - lg(psize) <= pesize. The information in an entry cannot overflow its
//   bounds.
// 2. psize < 2 ^ vawid, psize < 2 ^ pawid. There should be more than one page.
// 3. The page table base address must be valid as both a virtual and physical address,
//   but is treated as a virtual address. If "pawid" is smaller than "vawid", "ptbase"
//   must be a valid physical address, but extended to a virtual address.

var leftstr = [];  // Left-side displayed information
var rightstr = []; // Right-side displayed question
var response = []; // "Correct", or "Incorrect" with information
var answer = "";   // The player's current answer

var msgstr = "";
var bitstr = "";
var bitstrr = "";

var lspos = 0;
var rspos = 0;
var lsdst = 0;
var rsdst = 0;
var vpos = 0;
var vdst = 0;

// Both values are inclusive
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// Generates a random BigInt of the given width
function randomBig(bits) {
	let ans = 0n;
	let len = 0n;
	while(len + 8n < bits) {
		let n = Math.floor(Math.random() * 256);
		ans |= BigInt(n) << len;
		len += 8n;
	}
	let rem = bits - Number(len);
	if(rem > 0) {
		let n = Math.floor(Math.random() * (1 << rem));
		ans |= BigInt(n) << len;
	}
	return ans;
}

// Fast log base 2
// This only works if the number is a power of 2, for anything else it is floor(lg(n))
function lg(num) {
	return 31 - Math.clz32(num);
}

// Zeroes a number of lsbs from a given BigInt
// Works with up to ENTMAX bits. It could work up to lg(num) bits, but this is faster.
function zeroBits(num, bits) {
	let mask = ((1n << BigInt(ENTMAX)) - 1n) ^ ((1n << BigInt(bits)) - 1n);
	return num & mask;
}

// Zeroes everything except a number of lsbs from a given BigInt
function invZeroBits(num, bits) {
	let mask = (1n << BigInt(bits)) - 1n;
	return num & mask;
}

// Displays strings or string arrays one line at a time based on the given time value
function appearText(txt, x, y, time) {
	if(time < 0) return;
	if(typeof txt === "string") {
		if(time < TIMESTEPS) {
			let color = Math.floor(255 - time * 255 / TIMESTEPS);
			ctx.fillStyle = `rgb(${color} ${color} ${color})`;
			ctx.fillText(txt, x, y + 22 + LINEHEI / 2 - Math.floor(color / 16));
			ctx.fillStyle = "black";
		} else ctx.fillText(txt, x, y + 22 + LINEHEI / 2);
		return;
	}
	let voffset = LINEHEI * txt.length / 2; 
	let step = Math.min(Math.floor(time / TIMESTEPS), txt.length);
	if(step < txt.length) {
		let off = time - step * TIMESTEPS;
		let color = Math.floor(255 - off * 255 / TIMESTEPS);
		ctx.fillStyle = `rgb(${color} ${color} ${color})`;
		ctx.fillText(txt[step], x, y + 22 + LINEHEI * step - voffset - Math.floor(color / 16));
		ctx.fillStyle = "black";
	}
	for(i = 0; i < step; i++) {
		ctx.fillText(txt[i], x, y + 22 + LINEHEI * i - voffset);
	}
}

// Draws an array of text
function drawText(txt, x, y) {
	let voffset = LINEHEI * txt.length / 2;
	for(i = 0; i < txt.length; i++) {
		ctx.fillText(txt[i], x, y + 22 + LINEHEI * i - voffset);
	}
}

// Hides a string or array of strings in an animation
function disappearText(txt, x, y, time) {
	if(time > TIMESTEPS) return;
	let color = 0;
	if(time > 0) {
		color = Math.floor(time * 255 / TIMESTEPS);
		ctx.fillStyle = `rgb(${color} ${color} ${color})`;
	}
	if(typeof txt === "string") {
		ctx.fillText(txt, x, y + 22 + LINEHEI / 2 + Math.floor(color / 16));
	} else {
		let voffset = LINEHEI * txt.length / 2;
		for(i = 0; i < txt.length; i++) {
			ctx.fillText(txt[i], x, y + 22 + LINEHEI * i - voffset + Math.floor(color / 16));
		}
	}
	ctx.fillStyle = "black";
}

// Prints a string as individual characters with fixed spacing
function printChars(txt, x, y) {
	for(i = 0; i < txt.length; i++) {
		ctx.fillText(txt[i], x + (i - txt.length / 2 + 0.5) * CHDIST, y);
	}
}

// Works with "printChars", given a subset of a string, gives the horizontal offset of
// the center of the subset from the center of the whole string
function midpoint(lft, rgt, len) {
	return (lft + rgt - len) * CHDIST / 2;
}

// Takes a decimal number string and converts it to unicode superscript characters
function toSuper(str) {
	let ans = "";
	for(i = 0; i < str.length; i++) {
		ans += SUPERS[str.charCodeAt(i) - 48];
	}
	return ans;
}

// Gives an offset to move "pos" towards, but not past, "dest", and no faster than
// ANIMSPD
function animate(pos, dest) {
	let off = dest - pos;
	return Math.sign(off) * Math.min(ANIMSPD, Math.abs(off));
}

// Draws the main menu
function drawMenu(mv) {
	mvpos += 0.01;
	if(mvpos >= 2) mvpos = 0;
	
	ctx.font = "30px serif";
	ctx.textAlign = "center";
	ctx.fillText("MMU Test", HCWID, QCHEI + Math.sin(mvpos * Math.PI) * 10 - mv);
	
	ctx.font = "20px serif";
	for(i = 0; i < OPTS.length; i++) {
		ctx.fillStyle = i == mpos ? "black" : "gray";
		ctx.fillText(OPTS[i], TQCWID + mv, HCHEI + 22 + LINEHEI * i);
	}
	
	for(i = 0; i < TYPES.length; i++) {
		ctx.fillStyle = (i == type || (state == 0 && i == mpos - MOFFSET)) ? "black" : "gray";
		ctx.fillText(TYPES[i], QCWID - mv, HCHEI + 22 + LINEHEI * i);
	}
	for(i = TYPES.length + 1; i <= TYPES.length + STYPES.length; i++) {
		ctx.fillStyle = (i == stype || (state == 0 && i == mpos - MOFFSET)) ? "black" : "gray";
		ctx.fillText(STYPES[i - TYPES.length - 1], QCWID - mv, HCHEI + 22 + LINEHEI * i);
	}
	ctx.fillStyle = "black";
	
	ctx.beginPath();
	ctx.arc(mx, my, 1, 0, 2 * Math.PI);
	ctx.fill();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	switch(state) {
		case 0: // Main menu
			// Handle mouse position
			if(Math.abs(TQCWID - mx) < MENUHWID) {
				mpos = Math.floor((my - HCHEI) / LINEHEI);
				if(mpos < 0 || mpos >= OPTS.length) mpos = -1;
			} else if(Math.abs(QCWID - mx) < MENUHWID) {
				mpos = Math.floor((my - HCHEI) / LINEHEI);
				if(mpos >= 0 && mpos <= TYPES.length + STYPES.length) {
					mpos += MOFFSET;
				} else mpos = -1;
			} else mpos = -1;
			
			drawMenu(0);
			break;
		case 1: // Transition from menu
			clk++;
			drawMenu(Math.pow(clk, 3) / 300);
			
			// Check end of transition, init tutorial/test
			if(clk > 40) {
				clk = 0;
				if(nstate == 1) {
					if(stype == TYPES.length + 1) {
						// Simplified type
						vawid = randomInt(SADDRMIN / 2, SADDRMAX / 2) * 2;
						pawid = vawid;
						pswid = randomInt(SPWIDMIN, SPWIDMAX);
						
						leftstr = [
							"MMU Info:",
							"Address Width: " + vawid + " bits",
							"Page Size: " + Math.pow(2, pswid) + " (2" + toSuper(pswid.toString()) + ") bytes",
							"",
							"",
						];
					} else {
						// Realistic type
						vawid = randomInt(ADDRMIN / 2, ADDRMAX / 2) * 2;
						if(Math.random() < VEQPCHANCE) {
							pawid = vawid;
						} else pawid = randomInt(ADDRMIN / 2, ADDRMAX / 2) * 2;
						
						pswid = randomInt(PWIDMIN, PWIDMAX);
						
						let tpesize = randomInt(pawid - pswid, ENTMAX);
						pesize = lg(tpesize);
						if(tpesize != 1 << pesize) pesize++;
						pesize = 1 << (pesize - 3);
						
						ptbase = randomBig(Math.min(vawid, pawid));
						//ptbase = zeroBits(ptbase, pswid + lg(pesize));
						ptbase = zeroBits(ptbase, vawid - pswid + lg(pesize));
						
						leftstr = [
							"MMU Info:",
							"Virtual Address Width: " + vawid + " bits",
							"Physical Address Width: " + pawid + " bits",
							"Page Size: " + Math.pow(2, pswid) + " (2" + toSuper(pswid.toString()) + ") bytes",
							"Page Table Entry Size: " + pesize + " bytes",
							"Page Table Base Address:",
							"0x" + ptbase.toString(16).toUpperCase(),
							"",
							"",
						];
					}
					
					rightstr = [
						"1. How many bits are used to find",
						"the correct page table entry?"
					];
					qans = vawid - pswid;
					marks = "";
					answer = "";
					state = 3;
				} else {
					if(stype == TYPES.length + 1) {
						msgstr = "1. A virtual address is sent from the CPU to the MMU.";
						vawid = randomInt(SADDRMIN / 2, SADDRMAX / 2) * 2;
						pswid = randomInt(SPWIDMIN, SPWIDMAX);
						
						inaddr = randomBig(vawid);
						entry = randomBig(vawid - pswid);
						bitstr = inaddr.toString(2);
						bitstr = "0".repeat(vawid - bitstr.length) + bitstr;
						lspos = 0;
					}
					state = 20;
				}
			}
			break;
		case 2:
			clk--;
			drawMenu(Math.pow(clk, 3) / 300);
			if(clk <= 0) state = 0;
			break;
		case 3: // Test 1
			if(clk <= (leftstr.length + rightstr.length) * TIMESTEPS) clk++;
			appearText(leftstr, QCWID, HCHEI, clk);
			appearText(rightstr, TQCWID, QCHEI, clk - TIMESTEPS * (leftstr.length - 2));
			ctx.fillText(answer, TQCWID, TQCHEI + 22);
			ctx.fillStyle = "red";
			ctx.fillText(marks, TQCWID, TQCHEI + 22 - LINEHEI);
			ctx.fillStyle = "black";
			break;
		case 4: // Test 1->
			clk++;
			drawText(leftstr, QCWID, HCHEI, clk);
			disappearText(rightstr, TQCWID, QCHEI, clk);
			if(clk < TIMESTEPS + PAUSE) {
				appearText(response, TQCWID, HCHEI, clk);
			} else if(clk < TIMESTEPS * 2 + PAUSE) {
				disappearText(response, TQCWID, HCHEI, clk - TIMESTEPS - PAUSE);
			} else {
				inaddr = randomBig(vawid);
				leftstr[leftstr.length - 2] = "Input Address: 0x" + inaddr.toString(16).toUpperCase();
				if(stype == TYPES.length + 1) {
					rightstr = [
						"2. What page table entry",
						"is accessed for this address?"
					];
					qans = inaddr >> BigInt(pswid);
				} else {
					rightstr = [
						"2. What address holds the",
						"needed page table entry?"
					];
					//qans = zeroBits(ptbase | (inaddr >> BigInt(pswid)), lg(pesize));
					qans = zeroBits(ptbase | (inaddr >> BigInt(pswid - lg(pesize))), lg(pesize));
				}
				marks = "";
				clk = TIMESTEPS * (leftstr.length - 2);
				state = 5;
			}
			break;
		case 5: // Test 2
			if(clk <= (leftstr.length + rightstr.length + 1) * TIMESTEPS) clk++;
			appearText(leftstr, QCWID, HCHEI, clk);
			appearText(rightstr, TQCWID, QCHEI, clk - TIMESTEPS * (leftstr.length - 1));
			ctx.fillText(answer, TQCWID, TQCHEI + 22);
			ctx.fillStyle = "red";
			ctx.fillText(marks, TQCWID, TQCHEI + 22 - LINEHEI);
			ctx.fillStyle = "black";
			break;
		case 6: // Test 2->
			clk++;
			drawText(leftstr, QCWID, HCHEI, clk);
			disappearText(rightstr, TQCWID, QCHEI, clk);
			if(clk < TIMESTEPS + PAUSE) {
				appearText(response, TQCWID, HCHEI, clk);
			} else if(clk < TIMESTEPS * 2 + PAUSE) {
				disappearText(response, TQCWID, HCHEI, clk - TIMESTEPS - PAUSE);
			} else {
				entry = randomBig(pawid - pswid);
				leftstr[leftstr.length - 1] = "Page Table Entry: 0x" + entry.toString(16).toUpperCase();
				rightstr = [
					"3. What is the final address?"
				];
				qans = (entry << BigInt(pswid)) | invZeroBits(inaddr, pswid);
				marks = "";
				clk = TIMESTEPS * (leftstr.length - 1);
				state = 7;
			}
			break;
		case 7: // Test 3
			if(clk <= (leftstr.length + rightstr.length + 1) * TIMESTEPS) clk++;
			appearText(leftstr, QCWID, HCHEI, clk);
			appearText(rightstr, TQCWID, QCHEI, clk - TIMESTEPS * leftstr.length);
			appearText(answer.length > 0 ? "0x" + answer : "0x0", TQCWID, TQCHEI, clk - TIMESTEPS * (leftstr.length + rightstr.length));
			ctx.fillStyle = "red";
			ctx.fillText(marks, TQCWID, TQCHEI + 22 - LINEHEI);
			ctx.fillStyle = "black";
			break;
		case 8: // Test 3->
			clk++;
			disappearText(rightstr, TQCWID, QCHEI, clk);
			if(clk < TIMESTEPS + PAUSE) {
				drawText(leftstr, QCWID, HCHEI, clk);
				appearText(response, TQCWID, HCHEI, clk);
			} else if(clk < TIMESTEPS * 2 + PAUSE) {
				disappearText(leftstr, QCWID, HCHEI, clk - TIMESTEPS - PAUSE);
				disappearText(response, TQCWID, HCHEI, clk - TIMESTEPS - PAUSE);
			} else {
				clk = 40;
				state = 2;
			}
			break;
		case 20: // Tutorial 1
			if(clk < PAUSE) clk++;
			appearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, HCWID - Math.pow(PAUSE - clk, 2) / 2, HCHEI);
			break;
		case 21:
			clk++;
			lspos += animate(lspos, lsdst);
			rspos += animate(rspos, rsdst);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, HCHEI);
			disappearText(msgstr, HCWID, QCHEI, clk);
			if(lspos == lsdst && rspos == rsdst && clk > TIMESTEPS) {
				msgstr = [
					"2. The address is split into two sections.", 
					"The widths of these sections are hard-wired into the MMU.",
				];
				leftstr = [
					"The Table Index",
					"This indicates the page of the address.",
					"The wider this is, the more entries",
					"there are in the page table.",
				];
				rightstr = [
					"The Page Index",
					"This indicates the location within",
					"a page. The wider this is, the",
					"larger individual pages are.",
				];
				clk = 0;
				state = 22;
			}
			break;
		case 22:
			if(clk < TIMESTEPS * Math.max(leftstr.length, rightstr.length)) clk++;
			appearText(msgstr, HCWID, QCHEI, clk);
			appearText(leftstr, QCWID, HCHEI + LINEHEI * 2 + 22, clk);
			appearText(rightstr, TQCWID, HCHEI + LINEHEI * 2 + 22, clk);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, HCHEI);
			break;
		case 23:
			clk++;
			disappearText(msgstr, HCWID, QCHEI, clk);
			disappearText(leftstr, QCWID, HCHEI + LINEHEI * 2 + 22, clk);
			disappearText(rightstr, TQCWID, HCHEI + LINEHEI * 2 + 22, clk);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, HCHEI);
			if(clk >= TIMESTEPS) {
				msgstr = [
					"3. The table index is used to look up the corresponding",
					"page table entry in memory",
				];
				vpos = HCHEI;
				vdst = HCHEI + LINEHEI;
				lsdst = HCWID;
				clk = 0;
				state = 24;
			}
			break;
		case 24:
			if(clk < TIMESTEPS * msgstr.length) clk++;
			appearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, vpos);
			vpos = Math.min(vpos + ANIMSPD, vdst);
			lspos = Math.min(lspos + ANIMSPD * 2, lsdst);
			break;
		case 25:
			clk++;
			disappearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, vpos);
			lspos += clk;
			if(lspos >= canvas.width + QCWID) {
				msgstr = [
					"4. If a valid page table entry exists, the MMU pulls",
					"the page base address from it."
				];
				bitstr = entry.toString(2);
				bitstr = "0".repeat(vawid - pswid - bitstr.length) + bitstr;
				lsdst = clk;
				clk = 0;
				state = 26;
			}
			break;
		case 26:
			if(clk < TIMESTEPS * msgstr.length) clk++;
			appearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, vpos);
			if(lsdst > 0) lspos -= lsdst--;
			break;
		case 27:
			clk++;
			disappearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, vpos);
			lspos = Math.max(lspos - ANIMSPD * 2, lsdst);
			if(lspos == lsdst && clk > TIMESTEPS) {
				msgstr = [
					"5. The page table base address and page index",
					"are combined to make the physical address."
				];
				clk = 0;
				state = 28;
			}
			break;
		case 28:
			if(clk < TIMESTEPS * msgstr.length) clk++;
			appearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, vpos);
			vpos = Math.max(vpos - ANIMSPD, vdst);
			break;
		case 29:
			clk++;
			disappearText(msgstr, HCWID, QCHEI, clk);
			lspos += animate(lspos, lsdst);
			rspos += animate(rspos, rsdst);
			printChars(bitstr, lspos, HCHEI);
			printChars(bitstrr, rspos, HCHEI);
			if(lspos == lsdst && rspos == rsdst && clk > TIMESTEPS * msgstr.length) {
				msgstr = "6. The physical address is used to read data from memory";
				bitstr = bitstr + bitstrr;
				lspos = HCWID;
				clk = 0;
				state = 30;
			}
			break;
		case 30:
			if(clk < TIMESTEPS) clk++;
			appearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, lspos, HCHEI);
			break;
		case 31:
			clk++;
			disappearText(msgstr, HCWID, QCHEI, clk);
			printChars(bitstr, lspos, HCHEI);
			lspos += clk;
			if(lspos >= canvas.width + HCWID) {
				clk = 40;
				state = 2;
			}
			break;
	}
}

function mouseMoveEvent(evt) {
	var r = canvas.getBoundingClientRect();
	mx = evt.clientX - r.left;
    my = evt.clientY - r.top;
}

function mouseClickEvent(evt) {
	switch(state) {
		case 0: // Main menu
			if(mpos >= MOFFSET) {
				let tpos = mpos - MOFFSET;
				if(tpos < TYPES.length) {
					type = tpos;
				} else if(tpos > TYPES.length) stype = tpos;
			} else if(mpos > -1) {
				clk = 0;
				state = 1;
				nstate = mpos;
			}
			break;
		case 20:
			lspos = Math.trunc(HCWID + midpoint(0, vawid - pswid, vawid));
			rspos = Math.trunc(HCWID + midpoint(vawid - pswid + 1, vawid - 1, vawid));
			bitstrr = bitstr.substring(vawid - pswid);
			bitstr = bitstr.substring(0, vawid - pswid);
			lsdst = QCWID;
			while(lsdst - (vawid * CHDIST / 2 + lspos - HCWID) <= -CHDIST / 2) {
				lsdst += CHDIST;
			}
			rsdst = TQCWID;
			state++;
			clk = 0;
			break;
		case 22:
		case 30:
			state++;
			clk = 0;
			break;
		case 24:
			vpos = vdst;
			lspos = lsdst;
			state++;
			clk = 0;
			break;
		case 26:
			lspos = HCWID;
			lsdst = QCWID;
			while(lsdst - (vawid * CHDIST / 2 + midpoint(0, vawid - pswid, vawid)) <= -CHDIST / 2) {
				lsdst += CHDIST;
			}
			vdst = HCHEI;
			state++;
			clk = 0;
			break;
		case 28:
			vpos = vdst;
			lsdst = HCWID + midpoint(0, vawid - pswid, vawid);
			rsdst = HCWID + midpoint(vawid - pswid + 1, vawid - 1, vawid);
			state++;
			clk = 0;
			break;
	}
}

function keyboardEvent(evt) {
	//console.log(evt.key);
	let val = 0;
	switch(state) {
		case 3:
			val = evt.key.charCodeAt(0);
			if(val > 47 && val < 58 && answer.length < 8) {
				answer += evt.key;
			} else if(evt.key == "Enter" && answer.length > 0) {
				if(answer == qans) {
					response = ["Correct"];
					clk = 0;
					state = 4;
				} else {
					//marks += "\uFE0E\u274C";
					marks += "\u2716";
					if(marks.length >= 3) {
						response = ["Incorrect", "The answer was " + qans];
						clk = 0;
						state = 4;
					}
				}
				answer = "";
			} else if(evt.key == "Backspace" && answer.length > 0) {
				answer = answer.substring(0, answer.length - 1);
			}
			break;
		case 5:
			val = evt.key.charCodeAt(0);
			if(val > 47 && val < 58 && answer.length < 8) {
				answer += evt.key;
			} else if(val > 96 && val < 103 && answer.length < 8) {
				answer += evt.key.toUpperCase();
			} else if(evt.key == "Enter" && answer.length > 0) {
				// "Simplified" indexes can be written in decimal
				if((stype == TYPES.length + 1 && answer == qans.toString(10)) || answer == qans.toString(16).toUpperCase()) {
					response = ["Correct"];
					clk = 0;
					state = 6;
				} else {
					//marks += "\uFE0E\u274C";
					marks += "\u2716";
					if(marks.length >= 3) {
						response = ["Incorrect", "The answer was " + qans];
						clk = 0;
						state = 6;
					}
				}
				answer = "";
			} else if(evt.key == "Backspace" && answer.length > 0) {
				answer = answer.substring(0, answer.length - 1);
			}
			break;
		case 7:
			val = evt.key.charCodeAt(0);
			if(val > 47 && val < 58 && answer.length < 8) {
				answer += evt.key;
			} else if(val > 96 && val < 103 && answer.length < 8) {
				answer += evt.key.toUpperCase();
			} else if(evt.key == "Enter" && answer.length > 0) {
				if(answer == qans.toString(16).toUpperCase()) {
					response = ["Correct"];
					clk = 0;
					state = 8;
				} else {
					//marks += "\uFE0E\u274C";
					marks += "\u2716";
					if(marks.length >= 3) {
						response = ["Incorrect", "The answer was 0x" + qans];
						clk = 0;
						state = 8;
					}
				}
				answer = "";
			} else if(evt.key == "Backspace" && answer.length > 0) {
				answer = answer.substring(0, answer.length - 1);
			}
			break;
	}
}

setInterval(draw, 33);
canvas.addEventListener("mousemove", mouseMoveEvent);
canvas.addEventListener("click", mouseClickEvent);
canvas.addEventListener("keydown", keyboardEvent);
