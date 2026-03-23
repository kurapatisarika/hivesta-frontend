import { useState, useRef, useEffect } from "react";

const T = {
  bg:"#000000", surface:"#111111", border:"#2A2A2A", borderGold:"#444444",
  gold:"#FFFFFF", goldLight:"#FFFFFF", goldDim:"#888888",
  text:"#FFFFFF", textDim:"#AAAAAA", textMuted:"#555555",
};
const LOGO_B64 = "data:image/png;base64,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";


const SAMPLE_DATA = {
  address: "38 Lark Drive, Placida, FL 33946",
  plan_name: "The Sun Palm",
  ceiling_height_ft: 10,
  area_tabulation: { living: 1855, garage: 540, lanai: 260, total_under_roof: 2655 },
  rooms: [
    { name:"Master Bedroom",    length:"15'-0\"", width:"12'-8\"", sqft_interior:190, category:"living",  ref:"Sheet A-1" },
    { name:"Walk In Closet",    length:"9'-0\"",  width:"5'-0\"",  sqft_interior:45,  category:"living",  ref:"Sheet A-1" },
    { name:"Walk In Shower",    length:"5'-7\"",  width:"4'-0\"",  sqft_interior:22,  category:"living",  ref:"Sheet A-1 / FP-1" },
    { name:"Master Bath",       length:"9'-8\"",  width:"9'-0\"",  sqft_interior:87,  category:"living",  ref:"Sheet A-1" },
    { name:"On Suite",          length:"16'-4\"", width:"14'-6\"", sqft_interior:237, category:"living",  ref:"Sheet A-1" },
    { name:"Bath (On Suite)",   length:"6'-0\"",  width:"7'-0\"",  sqft_interior:42,  category:"living",  ref:"Sheet A-1" },
    { name:"WIC (On Suite)",    length:"6'-0\"",  width:"7'-0\"",  sqft_interior:42,  category:"living",  ref:"Sheet A-1" },
    { name:"Bedroom 2",         length:"12'-0\"", width:"12'-0\"", sqft_interior:144, category:"living",  ref:"Sheet A-1" },
    { name:"Bedroom 3",         length:"12'-0\"", width:"12'-0\"", sqft_interior:144, category:"living",  ref:"Sheet A-1" },
    { name:"Guest Bath",        length:"8'-10\"", width:"5'-0\"",  sqft_interior:44,  category:"living",  ref:"Sheet A-1" },
    { name:"Half Bath",         length:"5'-0\"",  width:"4'-8\"",  sqft_interior:23,  category:"living",  ref:"Sheet A-1" },
    { name:"Living Room",       length:"17'-4\"", width:"13'-4\"", sqft_interior:231, category:"living",  ref:"Sheet A-1" },
    { name:"Dining Room",       length:"13'-2\"", width:"7'-1\"",  sqft_interior:93,  category:"living",  ref:"Sheet A-1" },
    { name:"Kitchenette",       length:"--",      width:"--",      sqft_interior:45,  category:"living",  ref:"Sheet A-1" },
    { name:"Coffee / Wine Bar", length:"--",      width:"--",      sqft_interior:20,  category:"living",  ref:"Sheet A-1" },
    { name:"Foyer",             length:"10'-0\"", width:"7'-5\"",  sqft_interior:74,  category:"living",  ref:"Sheet A-1" },
    { name:"Raised Front Entry",length:"--",      width:"--",      sqft_interior:55,  category:"living",  ref:"Sheet A-1 / S-2" },
    { name:"Mud Room",          length:"9'-4\"",  width:"5'-0\"",  sqft_interior:47,  category:"living",  ref:"Sheet A-1" },
    { name:"Pantry",            length:"10'-0\"", width:"5'-0\"",  sqft_interior:50,  category:"living",  ref:"Sheet A-1" },
    { name:"Covered Lanai",     length:"30'-0\"", width:"--",      sqft_interior:260, category:"lanai",   ref:"Sheet A-1 / FP-1" },
    { name:"Garage",            length:"28'-8\"", width:"20'-0\"", sqft_interior:540, category:"garage",  ref:"Sheet A-1 / FP-1" },
  ],
  windows_doors: [
    { item:"3060 Horizontal Roller (JELDWEN)",         size:"36\" x 72\"",    location:"All Bedrooms",           qty:4,  type:"window",        ref:"Sheet S-1" },
    { item:"3030 Horizontal Roller (JELDWEN)",         size:"36\" x 36\"",    location:"Bathrooms",              qty:3,  type:"window",        ref:"Sheet S-1" },
    { item:"5040 Single Hung (PGT 670HP)",             size:"60\" x 48\"",    location:"Living / Dining Area",   qty:1,  type:"window",        ref:"Sheet S-1" },
    { item:"2818 Awning",                              size:"34\" x 22\"",    location:"Master Bath / On Suite", qty:2,  type:"window",        ref:"Sheet S-1" },
    { item:"8068 SGD Impact (FL 13459.3)",             size:"96\" x 80.5\"",  location:"Living Room to Lanai",   qty:1,  type:"sliding_door",  ref:"Sheet S-1 / A-1" },
    { item:"6068 SGD Impact (FL 23-0710.04)",          size:"72\" x 80.5\"",  location:"Master Bed to Lanai",    qty:1,  type:"sliding_door",  ref:"Sheet S-1 / A-1" },
    { item:"6068 SGD Impact (FL 23-0710.04)",          size:"72\" x 80.5\"",  location:"On Suite to Lanai",      qty:1,  type:"sliding_door",  ref:"Sheet S-1 / A-1" },
    { item:"3068 Entry Door Impact (THERMA TRU)",      size:"36\" x 80\"",    location:"Front Entry",            qty:1,  type:"entry_door",    ref:"Sheet S-1 / DT-3" },
    { item:"2868 Entry Door Impact (CLOPLAY)",         size:"32\" x 80\"",    location:"Garage to Living",       qty:1,  type:"entry_door",    ref:"Sheet S-1 / DT-3" },
    { item:"Interior Door 2868",                       size:"2'8\" x 6'8\"",  location:"All Rooms",              qty:13, type:"interior_door", ref:"Sheet A-1" },
    { item:"Interior Door 2860",                       size:"2'8\" x 6'0\"",  location:"Closets / Bathrooms",    qty:8,  type:"interior_door", ref:"Sheet A-1 / FP-1" },
    { item:"Overhead Garage Door - 16ft Wide", size:"16'-0\" x 7'-0\"", location:"Garage - Main Opening", qty:1, type:"garage_door", ref:"Sheet S-8 / FP-1" },
    { item:"Overhead Garage Door - 8ft Wide",  size:"8'-0\" x 7'-0\"",  location:"Garage - Side Opening",  qty:1, type:"garage_door", ref:"Sheet S-8 / FP-1" },
  ],
  plumbing: [
    { item:"Kitchen Sink",            location:"Kitchenette",    qty:1, ref:"Sheet A-1" },
    { item:"Kitchen Faucet",          location:"Kitchenette",    qty:1, ref:"Sheet A-1" },
    { item:"Dishwasher Connection",   location:"Kitchenette",    qty:1, ref:"Sheet A-1" },
    { item:"Lavatory / Sink",         location:"Master Bath",    qty:2, ref:"Sheet A-1" },
    { item:"Faucet",                  location:"Master Bath",    qty:2, ref:"Sheet A-1" },
    { item:"Lavatory / Sink",         location:"On Suite Bath",  qty:1, ref:"Sheet A-1" },
    { item:"Faucet",                  location:"On Suite Bath",  qty:1, ref:"Sheet A-1" },
    { item:"Lavatory / Sink",         location:"Guest Bath",     qty:1, ref:"Sheet A-1" },
    { item:"Faucet",                  location:"Guest Bath",     qty:1, ref:"Sheet A-1" },
    { item:"Lavatory / Sink",         location:"Half Bath",      qty:1, ref:"Sheet A-1" },
    { item:"Faucet",                  location:"Half Bath",      qty:1, ref:"Sheet A-1" },
    { item:"Walk-In Shower",          location:"Master Bath",    qty:1, ref:"Sheet A-1 / FP-1" },
    { item:"Tub / Shower Combo",      location:"On Suite Bath",  qty:1, ref:"Sheet A-1" },
    { item:"Tub / Shower Combo",      location:"Guest Bath",     qty:1, ref:"Sheet A-1" },
    { item:"Toilet",                  location:"Master Bath",    qty:1, ref:"Sheet A-1" },
    { item:"Toilet",                  location:"On Suite Bath",  qty:1, ref:"Sheet A-1" },
    { item:"Toilet",                  location:"Guest Bath",     qty:1, ref:"Sheet A-1" },
    { item:"Toilet",                  location:"Half Bath",      qty:1, ref:"Sheet A-1" },
    { item:"Washer Box",              location:"Mud Room",       qty:1, ref:"Sheet A-1" },
    { item:"Water Heater",            location:"Garage / Attic", qty:1, ref:"Sheet E-1" },
  ],
  electrical: [
    { item:"Ceiling Fan Junction Box (J/F)", location:"Master Bed, On Suite, Bed 2, Bed 3", qty:4, ref:"Sheet E-1" },
    { item:"Chandelier Junction Box (J/F)",  location:"Living Room",                         qty:1, ref:"Sheet E-1" },
    { item:"Pendant Light Junction Box (J/F)",location:"Dining Room",                        qty:1, ref:"Sheet E-1" },
    { item:"Coach Light / W/P Exterior",     location:"Covered Lanai (3) + Front Entry (2) + Garage Facade (2)", qty:7, ref:"Sheet E-1 / A-2 / A-5" },
    { item:"Exhaust Fan (Mechanical)",       location:"Master Bath, On Suite Bath, Guest Bath", qty:3, ref:"Sheet E-1" },
    { item:"Smoke / CO Detector (Combined)", location:"All Bedrooms + Common Areas",         qty:6, ref:"Sheet E-1" },
    { item:"Overhead Garage Door Opener",    location:"Garage - 2 Units",                    qty:2, ref:"Sheet E-1 / FP-1" },
    { item:"Electrical Control Panel (200A)",location:"Garage",                              qty:1, ref:"Sheet E-1" },
    { item:"AC Unit - Attic Installed",      location:"Attic - AC Pad",                      qty:1, ref:"Sheet A-1 / FP-1" },
    { item:"Thermostat",                     location:"Main Living Area",                    qty:1, ref:"Sheet E-1" },
    { item:"Door Bell / Chime",              location:"Front Entry",                         qty:1, ref:"Sheet E-1" },
  ],
  flooring: {
    interior_floor_sf:1198, bath_floor_sf:196, bath_wall_tile_sf:580, shower_floor_sf:22, exterior_tile_sf:310,
    details: [
      { area:"Living Room + Dining Room",   type:"Interior Floor",  sqft:324, ref:"Sheet A-1" },
      { area:"Foyer + Entry Hall",          type:"Interior Floor",  sqft:129, ref:"Sheet A-1" },
      { area:"Kitchen + Pantry + Mud Room", type:"Interior Floor",  sqft:162, ref:"Sheet A-1" },
      { area:"Kitchenette + Coffee Bar",    type:"Interior Floor",  sqft:65,  ref:"Sheet A-1" },
      { area:"Master Bedroom + WIC",        type:"Interior Floor",  sqft:235, ref:"Sheet A-1" },
      { area:"On Suite + WIC",              type:"Interior Floor",  sqft:279, ref:"Sheet A-1" },
      { area:"Bedroom 2 + Closet",          type:"Interior Floor",  sqft:168, ref:"Sheet A-1" },
      { area:"Bedroom 3 + Closet",          type:"Interior Floor",  sqft:168, ref:"Sheet A-1" },
      // BATH 1 - MASTER BATH: Walk-In Shower ONLY (no tub)
      { area:"Master Bath Floor",                type:"Bath Floor Tile",  sqft:87,  ref:"Sheet A-1" },
      { area:"Master Bath Shower Walls",         type:"Shower Wall Tile", sqft:192, ref:"Sheet A-1 / FP-1" },
      { area:"Master Bath Surround Walls",       type:"Shower Wall Tile", sqft:148, ref:"Sheet A-1" },
      { area:"Master Bath Shower Floor",         type:"Shower Floor",     sqft:22,  ref:"Sheet A-1 / FP-1" },
      // BATH 2 - ON SUITE: Tub/Shower Combo (tub surround ONLY, not full wall height)
      { area:"On Suite Bath Floor",              type:"Bath Floor Tile",  sqft:42,  ref:"Sheet A-1" },
      { area:"On Suite Bath Tub Surround",       type:"Tub Tile",         sqft:90,  ref:"Sheet A-1" },
      // BATH 3 - GUEST BATH: Tub/Shower Combo (tub surround ONLY, not full wall height)
      { area:"Guest Bath Floor",                 type:"Bath Floor Tile",  sqft:44,  ref:"Sheet A-1" },
      { area:"Guest Bath Tub Surround",          type:"Tub Tile",         sqft:80,  ref:"Sheet A-1" },
      // BATH 4 - HALF BATH: No tub, no shower
      { area:"Half Bath Floor",                  type:"Bath Floor Tile",  sqft:23,  ref:"Sheet A-1" },
      { area:"Half Bath Accent Walls",           type:"Wall Tile",        sqft:70,  ref:"Sheet A-1" },
      { area:"Raised Front Entry",           type:"Exterior Tile",   sqft:55,  ref:"Sheet A-1 / S-2" },
      { area:"Covered Lanai",               type:"Exterior Tile",   sqft:260, ref:"Sheet A-1 / FP-1" },
      { area:"Raised Front Entry / Porch",  type:"Exterior Tile",   sqft:50,  ref:"Sheet A-1 / S-2" },
    ],
  },
  foundation: {
    perimeter_lf: 343.69,
    slab_sf: 2655,
    wall_sf: 3670,
    stages: [
      { stage:"Stage 1 - Footer", items:[
        { activity:"Cement (Footers)",           qty:33,   unit:"CY",   ref:"Sheet FP-1A / GR-1", note:"3000 PSI +10% buffer. Calc: perim x 0.087 x 1.10 = 33 CY" },
        { activity:"Cement Delivery Fee",         qty:3,    unit:"LOAD", ref:"Site",                note:"Delivery loads for footer cement" },
        { activity:"85ft Boom Pump",              qty:1,    unit:"DAY",  ref:"Site",                note:"Footer pour day" },
        { activity:"Rebars #5 (20ft)",            qty:83,   unit:"EA",   ref:"Sheet FP-1A",         note:"Exact count. Calc: (343.69 x 4 / 20) x 1.10 lap + 7 corner bars = 83 EA" },
        { activity:"Dowels #5",                   qty:121,  unit:"EA",   ref:"Sheet FP-1A",         note:"Exact count. Calc: 86 (48 OC) + 20 corners + 15 openings = 121 EA" },
        { activity:"Rebar Chairs",                qty:3,    unit:"BOX",  ref:"Sheet FP-1A",         note:"+10% buffer. Calc: 2 x 1.10 = 3 BOX" },
        { activity:"Rebar Ties",                  qty:1,    unit:"ROLL", ref:"Sheet FP-1A",         note:"Tie all overlapping steel" },
        { activity:"Plastic Rolls",               qty:4,    unit:"ROLL", ref:"Sheet FP-1A",         note:"+10% buffer. Calc: 3 x 1.10 = 4 ROLL" },
        { activity:"Tape",                        qty:2,    unit:"ROLL", ref:"Site",                note:"Sealing plastic roll laps" },
      ]},
      { stage:"Stage 2 - Stem Wall", items:[
        { activity:"Sand",                        qty:3,    unit:"CY",   ref:"Site",                note:"+10% buffer. Calc: 2 x 1.10 = 3 CY" },
        { activity:"Masonry Cement",              qty:33,   unit:"BAGS", ref:"Sheet S-2",           note:"+10% buffer. Calc: perim x 0.087 x 1.10 = 33 BAGS" },
        { activity:"Blocks 8x16",                qty:715,  unit:"EA",   ref:"Sheet FP-1 / S-2",   note:"+10% buffer. Calc: (343.69 x 12/16) x 2 x 1.26 x 1.10 = 715 EA" },
        { activity:"Header Blocks (U-Block)",     qty:176,  unit:"EA",   ref:"Sheet FP-1 / S-2",   note:"+10% buffer. Calc: exterior perim x 12/16 x 1.10 = 176 EA" },
      ]},
      { stage:"Stage 3 - Slab Pour", items:[
        { activity:"Concrete with Fibermesh",     qty:44,   unit:"CY",   ref:"Sheet FP-1A / GR-1", note:"+10% buffer. Calc: 2655 SF x 4in/12 / 27 x 1.18 x 1.10 = 44 CY" },
        { activity:"Plastic Roll",                qty:4,    unit:"EA",   ref:"Sheet FP-1A",         note:"+10% buffer. Calc: 3 x 1.10 = 4 EA" },
        { activity:"Concrete Pump",               qty:1,    unit:"DAY",  ref:"Site",                note:"Pump for slab pour" },
      ]},
      { stage:"Stage 4 - Block Walls", items:[
        { activity:"Sand",                        qty:4,    unit:"CY",   ref:"Site",                note:"+10% buffer. Calc: 3 x 1.10 = 4 CY" },
        { activity:"Masonry Cement",              qty:6,    unit:"BAGS", ref:"Sheet S-2",           note:"+10% buffer. Calc: 5 x 1.10 = 6 BAGS" },
        { activity:"Blocks Regular 8x16",         qty:2310, unit:"EA",   ref:"Sheet FP-1 / DT-1",  note:"+10% buffer. Calc: 343.69 x 12/16 x 8 x 1.03 x 1.10 = 2310 EA" },
        { activity:"Bond Beam Block",             qty:236,  unit:"EA",   ref:"Sheet DT-1 / S-8",   note:"+10% buffer. Calc: (343.69 x 12/16 x 1.03 x 1.10) - openings = 236 EA" },
        { activity:"Half Blocks",                 qty:162,  unit:"EA",   ref:"Sheet FP-1",          note:"+10% buffer. Calc: 2310 x 0.07 x 1.10 = 162 EA" },
        { activity:"Rebar Dowels #5 (9ft-6in)",   qty:120,  unit:"EA",   ref:"Sheet FP-1A",         note:"Exact count. Calc: 86 (48 OC) + 20 corners + 14 openings = 120 EA" },
        { activity:"Rebar #5 (20ft)",             qty:26,   unit:"EA",   ref:"Sheet FP-1A / S-8",  note:"Exact count. Calc: (343.69 x 2 / 20) x 1.10 = 26 EA" },
        { activity:"Corner Rebar 24x24in #5",     qty:12,   unit:"EA",   ref:"Sheet FP-1A",         note:"Exact count from plan = 12 corners" },
        { activity:"Metal Lintel Screen",         qty:2,    unit:"ROLL", ref:"Sheet S-8",           note:"Behind all lintels" },
        { activity:"Rebar Ties",                  qty:1,    unit:"ROLL", ref:"Sheet FP-1A",         note:"All overlapping steel tied" },
        { activity:"Lintels (4ft)",               qty:5,    unit:"EA",   ref:"Sheet S-8 / S-1",    note:"Exact count from S-8 schedule" },
        { activity:"Lintels (8ft)",               qty:7,    unit:"EA",   ref:"Sheet S-8 / S-1",    note:"Exact count from S-8 schedule" },
        { activity:"Lintels (8ft-8in)",           qty:2,    unit:"EA",   ref:"Sheet S-8",           note:"Exact count from S-8 schedule" },
        { activity:"Lintels (9ft-4in)",           qty:2,    unit:"EA",   ref:"Sheet S-8 / S-1",    note:"Exact count from S-8 schedule" },
        { activity:"Lintels (10ft)",              qty:1,    unit:"EA",   ref:"Sheet S-8",           note:"Exact count from S-8 schedule" },
        { activity:"Lintels (15ft-4in)",          qty:2,    unit:"EA",   ref:"Sheet S-8",           note:"Exact count from S-8 schedule" },
        { activity:"Lintels (17ft-4in)",          qty:1,    unit:"EA",   ref:"Sheet S-8",           note:"Exact count from S-8 schedule" },
        { activity:"Window Sills (3ft-1in)",      qty:4,    unit:"EA",   ref:"Sheet S-1 / A-1",    note:"Exact count from S-1 schedule" },
        { activity:"Window Sills (6ft-2in)",      qty:4,    unit:"EA",   ref:"Sheet S-1 / A-1",    note:"Exact count from S-1 schedule" },
      ]},
      { stage:"Stage 5 - Cell Fills", items:[
        { activity:"Small Rock Concrete (Cell Fill)", qty:12, unit:"CY", ref:"Sheet FP-1A",        note:"+10% buffer. Calc: (2310/6)/3 x 2.08 x 1.10 / 27 x 1.10 = 12 CY" },
        { activity:"Concrete Pump",               qty:1,    unit:"DAY",  ref:"Site",                note:"Pump to fill CMU cells full height" },
      ]},
    ],
  },

  drywall: {
    notes: "Ceiling height 10'-0\" per Sheet A-2. Garage: 2x4 stud walls per Sheet S-2 / DT-1. Wet areas use Durock cement board per Sheet S-2. Lanai open - excluded.",
    ref: "Sheet A-2 / S-2 / DT-1",
  },
};

const AI_PROMPT = `You are a licensed senior construction estimator performing a precise plan takeoff. You must read every sheet, every note, every callout, every dimension, and every schedule on this PDF with extreme accuracy.

CRITICAL READING RULES - follow exactly:
1. READ EVERY SHEET: floor plan, foundation plan, electrical plan, window/door schedule, elevations, sections, details.
2. DIMENSIONS: Record exactly as shown (e.g. "15'-0""). Do not calculate or estimate. If no dimension shown, write "--".
3. SQFT PER ROOM: Use the sqft number printed on the plan next to or inside each room. Do NOT calculate from L x W dimensions. Copy the printed number exactly.
4. AREA TABULATION: This is the MASTER SOURCE OF TRUTH. Copy exactly from the plan's area tabulation box (living, garage, lanai, total under roof). These are the wall-to-wall measurements. The sum of individual room sqft will always be less than the area tabulation because rooms exclude wall thickness. NEVER change or recalculate these values.
4b. CONSISTENCY RULE: If this is the same plan model as a previously seen plan (same plan name, same room list, same dimensions), the area tabulation and room sqft values MUST be identical. Do not introduce variation between same-model plans.
5. CEILING HEIGHT: CRITICAL — Search EVERY sheet thoroughly. Do NOT default to 8ft or any assumed value.
   - PRIMARY SOURCE: Elevation sheets (Front, Rear, Left, Right elevations) — look for a dimension line showing floor-to-ceiling or floor-to-top-of-wall height.
   - SECONDARY SOURCE: Wall sections or building sections — look for "CLG HT", "CEILING HEIGHT", "PLATE HEIGHT", or a vertical dimension.
   - TERTIARY SOURCE: Floor plan notes — look for "10' CEILING", "9' CEILING", "CLG = X'-X\"" callouts anywhere on the plan.
   - QUATERNARY SOURCE: Drywall or finish notes on structural sheets.
   - If you find 10'-0" on ANY sheet, use 10. If you find 9'-0", use 9. NEVER assume 8ft unless 8ft is explicitly shown on the plans.
   - Record the exact value found and which sheet it came from in the drywall notes field.
6. WINDOWS & DOORS - CRITICAL:
   - Use ONLY the official WINDOW & DOOR SCHEDULE table on the plans. Do not count from floor plan labels or lintel notes.
   - Each ROW in the schedule = one entry. Copy the item name, size, qty exactly from that schedule row.
   - GARAGE DOORS - READ ALL THESE SOURCES AND CROSS-REFERENCE:
     SOURCE 1 - LINTEL/STRUCTURAL PLAN (Sheet S-8): Count the number of "TB-2" or "GARAGE DOOR OPENING SHALL BE SUPPORTED" callout boxes. Each separate callout = one garage door opening. This is the most reliable count.
     SOURCE 2 - FOUNDATION PLAN (Sheet FP-1): Count how many times "SEE GARAGE DOOR RECESS DETAIL" appears as separate callouts. Each = one opening.
     SOURCE 3 - FLOOR PLAN (Sheet A-1): The text label "16' OVERHEAD GARAGE DOOR" may refer to the total garage width, not individual doors. Look at the actual door symbols drawn, not just the label.
     SOURCE 4 - DOOR SCHEDULE (Sheet S-1): Check rows listed as overhead/garage door type.
     RULE: If S-8 shows 2 separate tie beam callouts for garage doors = 2 garage doors. List each as a separate entry with qty:1. The first opening is typically the larger (16' wide), the second is smaller (8' wide). Record actual sizes from the schedule or plan dimensions.
   - Type values: window, sliding_door, entry_door, interior_door, garage_door.
   - DO NOT DUPLICATE entries for the same opening, but DO create separate entries for genuinely separate openings.
7. ROOMS: List every labeled room on the floor plan. Use exact name from plan.
8. PLUMBING: Read from floor plan symbols and plumbing notes. Count each fixture symbol.
9. ELECTRICAL: Read from the electrical plan (E-1 sheet). Count each symbol per the legend. Split by device type (ceiling fan box, chandelier box, coach light, exhaust fan, smoke detector, etc.).
10. DO NOT DUPLICATE: Never create two entries for the same physical item. If a door appears once on the plan, it is qty:1 one entry.
11. NOTES & CALLOUTS: Read all notes on every sheet. Record drywall notes from structural sheets.
13. FOUNDATION - READ STRUCTURAL SHEETS (FP-1, FP-1A, S-2, S-8, GR-1):
    Calculate quantities for each stage based on plan dimensions:
    - perimeter_lf: Total linear feet of ALL foundation walls (outer perimeter + interior bearing walls). Read from foundation plan.
    - slab_sf: Total slab area from RP-1 or GR-1 (usually labeled "TOTAL SQ FEET").
    - wall_sf: perimeter_lf x ceiling height (usually 8ft for block walls above slab).
    CALCULATION FORMULAS - apply to any plan using its actual perimeter_lf and slab_sf:

    *** 10% BUFFER APPLIES ONLY TO BULK MATERIALS (concrete, blocks, sand, cement, plastic rolls) ***
    *** FIXTURES & STRUCTURAL ITEMS (lintels, window sills, rebar bars, dowels, corner rebar) = EXACT COUNT — NO BUFFER ***

    STAGE 1 FOOTER:
    - Cement CY = round(perim_lf x 0.087 x 1.10)  [+10% buffer — bulk material]
    - Cement Delivery = 3 LOADS
    - Boom Pump = 1 DAY
    - Rebars #5 20ft = round((perim_lf x 4 / 20) x 1.10) + 7 corner bars  [exact structural count]
    - Dowels #5 = round(perim_lf / 4) + count_corners + count_exterior_openings  [exact structural count]
    - Rebar Chairs = round(2 x 1.10) BOX  [+10% buffer — bulk material]
    - Rebar Ties = 1 ROLL, Plastic Rolls = round(3 x 1.10), Tape = 2 ROLL

    STAGE 2 STEM WALL:
    - Sand = round(2 x 1.10) CY  [+10% buffer — bulk material]
    - Masonry Cement = round(perim_lf x 0.087 x 1.10) BAGS  [+10% buffer — bulk material]
    - Blocks 8x16 = round((perim_lf x 12/16) x 2 courses x 1.26 waste x 1.10)  [+10% buffer — bulk material]
    - Header Blocks = round(exterior_perim_lf x 12/16 x 1.10)  [+10% buffer — bulk material]

    STAGE 3 SLAB:
    - Concrete+Fibermesh CY = round(slab_sf x (4/12) / 27 x 1.18 x 1.10)  [+10% buffer — bulk material]
    - Plastic Roll = round(3 x 1.10) EA  [+10% buffer — bulk material]
    - Concrete Pump = 1 DAY

    STAGE 4 BLOCK WALLS:
    - Sand = round(3 x 1.10) CY  [+10% buffer — bulk material]
    - Masonry Cement = round(5 x 1.10) BAGS  [+10% buffer — bulk material]
    - Regular Blocks = round((perim_lf x 12/16) x 8 courses x 1.03 waste x 1.10)  [+10% buffer — bulk material]
    - Bond Beam = round((perim_lf x 12/16) x 1.03 x 1.10) - openings_count x 2  [+10% buffer — bulk material]
    - Half Blocks = round(regular_blocks x 0.07 x 1.10)  [+10% buffer — bulk material]
    - Rebar Dowels #5 9ft6in = round(perim_lf/4) + count_corners + count_exterior_openings  [exact structural count — NO buffer]
    - Rebar #5 20ft = round((perim_lf x 2 / 20) x 1.10)  [exact structural count — NO buffer]
    - Corner Rebar 24x24 = count exterior block wall corners from floor plan  [exact structural count — NO buffer]
    - Metal Lintel Screen = 2 ROLLS, Rebar Ties = 1 ROLL
    LINTELS — EXACT COUNT FROM SCHEDULE, NO BUFFER:
    - 4ft lintels: count exactly from S-8 schedule
    - 8ft lintels: count exactly from S-8 schedule
    - 9ft-4in: count exactly from S-8 schedule
    - Large spans (15ft-4in, 17ft-4in etc): count exactly from S-8 schedule
    - Window Sills: count exactly from S-1 schedule by size
    - ref: "Sheet S-8 / S-1" for all lintels

    STAGE 5 CELL FILLS:
    - Small Rock Concrete CY = round((stage4_blocks / courses) / 3 x 2.08 x 1.10 / 27 x 1.10)  [+10% buffer — bulk material]
    - Concrete Pump = 1 DAY
    - ref: "Sheet FP-1A" (FILL EVERY CELL W/ MIN 3000PSI CONC)

    For ref field: cite exact sheet for every item.
    - LINTELS (CRITICAL - read Sheet S-8 Lintel Plan carefully):
      * Read the PRECAST LINTEL LOAD TABLE on Sheet S-8. Each window and door opening needs a lintel.
      * Lintel size = actual opening width (from floor plan dimensions) + 8in bearing each side.
      * Read EACH window/door callout on the floor plan. For each opening get the actual dimension shown.
      * PRACTICAL RULE: Use 8ft as the minimum standard lintel size for ALL windows and sliding doors regardless of opening width. Smaller sizes (4ft) are only for very small openings under 32in like awning windows and single doors. Group lintels by size and count.
      * For sliding glass doors: 8068=96in wide -> 96+16=112in -> round up = 10ft lintel. 6068=72in -> 72+16=88in -> 8ft lintel.
      * For beams spanning room widths (like tie beam over garage or large rooms): read the TIE BEAM notes on Sheet S-8. These have specific sizes like 17ft-4in (matching Living Room width), 15ft-4in (Master Bed), etc.
      * Read "SEE LINTEL PLAN" callouts on foundation plan for all lintel locations.
      * WINDOW SILLS: Count from window schedule. Note size in callout (e.g. "3060" = 3ft wide sill = "Window Sills (3ft-1in)"). Group by sill width.
    - Rebar for block walls: Read FP-1A for specific rebar quantities — Dowels #5(10ft), Dowels #5(6ft), #5 rebar 10ft, #5 rebar 20ft counts are shown in the foundation detail notes.

12. FLOORING - BATHROOM RULES (critical for ordering):
    - For each bathroom, create SEPARATE entries for each tile type.
    - Bath with WALK-IN SHOWER (no tub): entries = (a) floor tile, (b) shower wall tile full height, (c) shower floor tile. Type values: "Bath Floor Tile", "Shower Wall Tile", "Shower Floor".
    - Bath with TUB/SHOWER COMBO: entries = (a) floor tile, (b) tub surround tile ONLY (above tub rim, NOT full wall height). Type values: "Bath Floor Tile", "Tub Tile".
    - Half bath (no tub/shower): entries = (a) floor tile, (b) accent wall tile if noted. Type values: "Bath Floor Tile", "Wall Tile".
    - Area name format: "Master Bath Floor", "Master Bath Shower Walls", "Master Bath Shower Floor", "On Suite Bath Floor", "On Suite Bath Tub Surround", "Guest Bath Floor", "Guest Bath Tub Surround", "Half Bath Floor", "Half Bath Accent Walls".
    - NEVER combine tub surround and shower wall tile into one entry - they are different products ordered separately.

Return ONLY valid JSON, no markdown, no backticks:
{"address":"string","plan_name":"string","ceiling_height_ft":10,"area_tabulation":{"living":0,"garage":0,"lanai":0,"total_under_roof":0},"rooms":[{"name":"string","length":"string","width":"string","sqft_interior":0,"category":"living","ref":"string"}],"windows_doors":[{"item":"string","size":"string","location":"string","qty":1,"type":"window","ref":"string"}],"plumbing":[{"item":"string","location":"string","qty":1,"ref":"string"}],"electrical":[{"item":"string","location":"string","qty":1,"ref":"string"}],"flooring":{"interior_floor_sf":0,"bath_floor_sf":0,"bath_wall_tile_sf":0,"shower_floor_sf":0,"exterior_tile_sf":0,"details":[{"area":"string","type":"string","sqft":0,"ref":"string"}]},"drywall":{"notes":"string","ref":"string"},"foundation":{"perimeter_lf":0,"slab_sf":0,"wall_sf":0,"stages":[{"stage":"Stage 1 - Footer","items":[{"activity":"string","qty":0,"unit":"string","ref":"string","note":"string"}]}]}}`;

function numFmt(n) {
  const v=Number(n);
  if(!n&&n!==0) return "--";
  if(isNaN(v)) return "--";
  return v.toLocaleString("en-US");
}
function parseDim(s) {
  if(!s||s==="--") return 0;
  const m=String(s).match(/(\d+)['\-]\s*(\d+)?/);
  return m?(parseInt(m[1])||0)+(parseInt(m[2])||0)/12:0;
}

function calcDrywall(rooms, ch, areaTab) {
  // Use gross SF from area tabulation (wall-to-wall) for accuracy
  // Room dimensions often have "--" so calculating from L*W undercounts
  const at = areaTab || {};
  const livingSF  = Number(at.living)  || rooms.filter(r=>r.category==="living") .reduce((s,r)=>s+(Number(r.sqft_interior)||0),0);
  const garageSF  = Number(at.garage)  || rooms.filter(r=>r.category==="garage") .reduce((s,r)=>s+(Number(r.sqft_interior)||0),0);
  // Ceiling area = living area only (garage separate, lanai open/excluded)
  const ceilSF = livingSF;

  // Wall perimeter: estimate from living SF assuming average room ratio
  // Use actual room perimeters where dimensions exist, supplement with SF-based estimate
  let wpFromDims = 0;
  let sfCoveredByDims = 0;
  rooms.forEach(function(r) {
    const l=parseDim(r.length), w=parseDim(r.width);
    if(l<=0||w<=0) return;
    wpFromDims += 2*(l+w);
    sfCoveredByDims += l*w;
  });
  // For rooms without dimensions, estimate perimeter from their sqft (assume ~square)
  const sfMissing = livingSF - sfCoveredByDims;
  const wpEstimated = sfMissing > 0 ? Math.sqrt(sfMissing) * 4 * 1.4 : 0;
  let wp = wpFromDims + wpEstimated + 68; // +68 for interior partitions/offsets

  // Wet area (shower/tub walls use Durock)
  let ww = 0;
  rooms.forEach(function(r) {
    const l=parseDim(r.length), w=parseDim(r.width);
    if(l<=0||w<=0) return;
    if(/shower|tub/i.test(r.name)) ww += 2*(l+w)*ch;
  });

  const nw = wp * ch * 0.85;
  const da = nw - ww + ceilSF;
  const W  = 1.15;
  const s12 = Math.ceil(da * W / 48);
  const s8  = Math.ceil(s12 * 0.15);
  const dur = Math.ceil(ww * W / 32);
  const tot = s12 + s8 + dur;
  return {
    netWall:Math.round(nw), ceilSF:Math.round(ceilSF), dryArea:Math.round(da),
    s12, s8, dur, tot,
    compound:Math.ceil(tot/12), tape:Math.ceil(tot/8),
    bead:Math.ceil(rooms.length*2.5*ch/10),
  };
}

function doExportCSV(data, dw) {
  const rooms=Array.isArray(data.rooms)?data.rooms:[];
  const at=data.area_tabulation||{};
  const livingSF=rooms.filter(r=>r.category==="living").reduce((s,r)=>s+(Number(r.sqft_interior)||0),0);
  const garageSF=rooms.filter(r=>r.category==="garage").reduce((s,r)=>s+(Number(r.sqft_interior)||0),0);
  const lanaiSF =rooms.filter(r=>r.category==="lanai").reduce((s,r)=>s+(Number(r.sqft_interior)||0),0);
  const lR=(Number(at.living)&&livingSF)?Number(at.living)/livingSF:1;
  const gR=(Number(at.garage)&&garageSF)?Number(at.garage)/garageSF:1;
  const nR=(Number(at.lanai)&&lanaiSF)?Number(at.lanai)/lanaiSF:1;
  function rg(r){const ratio=r.category==="garage"?gR:r.category==="lanai"?nR:lR;return Math.round((r.sqft_interior||0)*ratio);}
  const lines=["HIVESTA CONSTRUCTION — TAKEOFF PRO","www.hivestaconstruction.com | (689) 254-3553 | 300 S Orange Av. Suite 1000, Orlando FL 32801","Project: "+data.plan_name,"Address: "+data.address,"Generated: "+new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),"","ROOMS","Room,Length,Width,Interior SF,Gross SF,Ref"];
  rooms.forEach(r=>lines.push('"'+r.name+'","'+r.length+'","'+r.width+'",'+(r.sqft_interior||0)+','+rg(r)+',"'+r.ref+'"'));
  lines.push("","WINDOWS & DOORS","Item,Size,Location,Qty,Ref");
  (data.windows_doors||[]).forEach(w=>lines.push('"'+w.item+'","'+w.size+'","'+w.location+'",'+w.qty+',"'+w.ref+'"'));
  lines.push("","FLOORING","Area,Type,SqFt,Ref");
  ((data.flooring||{}).details||[]).forEach(f=>lines.push('"'+f.area+'","'+f.type+'",'+f.sqft+',"'+f.ref+'"'));
  lines.push("","PLUMBING","Fixture,Location,Qty,Ref");
  (data.plumbing||[]).forEach(p=>lines.push('"'+p.item+'","'+p.location+'",'+p.qty+',"'+p.ref+'"'));
  lines.push("","ELECTRICAL","Device,Location,Qty,Ref");
  (data.electrical||[]).forEach(e=>lines.push('"'+e.item+'","'+e.location+'",'+e.qty+',"'+e.ref+'"'));
  lines.push("","DRYWALL","Material,Qty,Unit");
  [["Sheetrock 4x12",dw.s12,"sheets"],["Sheetrock 4x8",dw.s8,"sheets"],["Durock 4x8",dw.dur,"sheets"],
   ["ProForm Compound",dw.compound,"buckets"],["ProForm Tape",dw.tape,"rolls"],["Corner Bead 10ft",dw.bead,"pcs"]
  ].forEach(r=>lines.push('"'+r[0]+'",'+r[1]+',"'+r[2]+'"'));
  lines.push("TOTAL SHEETS,"+dw.tot,"","HIVESTA CONSTRUCTION | (689) 254-3553");
  const blob=new Blob([lines.join("\n")],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url; a.download="Hivesta_Takeoff_"+(data.plan_name||"").replace(/\s/g,"_")+".csv"; a.click();
}

function GoldLine() {
  return <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.borderGold},transparent)`}}/>;
}

function SectionCard({title,noPad,children}) {
  return (
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:6,marginBottom:10,overflow:"hidden"}}>
      {title&&<><div style={{padding:"8px 16px",fontSize:10,letterSpacing:2.5,color:T.gold,fontWeight:700,textTransform:"uppercase",background:"#0D0D00"}}>{title}</div><GoldLine/></>}
      <div style={noPad?{}:{padding:"12px 16px"}}>{children}</div>
    </div>
  );
}

function SummaryGrid({items}) {
  const cols=Math.min(items.length,5);
  return (
    <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:1,background:T.border,borderRadius:4,overflow:"hidden",marginBottom:8}}>
      {items.map(function(item,i) {
        return (
          <div key={i} style={{background:T.surface,padding:"10px 6px",textAlign:"center"}}>
            <div style={{fontSize:18,fontWeight:800,color:T.goldLight}}>{item.value}</div>
            <div style={{fontSize:8,color:T.textMuted,textTransform:"uppercase",marginTop:2,lineHeight:1.3}}>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}

const TH={padding:"9px 12px",color:"#C8A020",fontWeight:900,fontSize:11,letterSpacing:1.5,textTransform:"uppercase",whiteSpace:"nowrap",borderBottom:`1px solid ${T.border}`,background:"#0D0D00"};
const TD={padding:"8px 12px",fontSize:12};
const ROW_EVEN={borderBottom:`1px solid ${T.border}`,background:T.surface};
const ROW_ODD ={borderBottom:`1px solid ${T.border}`,background:"#0E0E00"};
const FOOT={borderTop:`1px solid ${T.borderGold}`,background:"#0D0D00"};

function RefBadge({value}) {
  if(!value) return <span style={{color:T.textMuted,fontSize:10}}>--</span>;
  return <span style={{display:"inline-block",background:"#1A1500",border:`1px solid ${T.goldDim}`,borderRadius:3,padding:"2px 7px",fontSize:10,fontWeight:600,color:T.gold,letterSpacing:0.3,whiteSpace:"nowrap"}}>{value}</span>;
}

function DataTable({cols,rows,footRow}) {
  return (
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr>{cols.map(function(c,i){return <th key={i} style={{...TH,textAlign:c.right?"right":"left"}}>{c.label}</th>;})}</tr></thead>
        <tbody>
          {rows.map(function(row,ri) {
            return (
              <tr key={ri} style={ri%2===0?ROW_EVEN:ROW_ODD}>
                {row.map(function(cell,ci) {
                  return (
                    <td key={ci} style={{...TD,textAlign:cell.right?"right":"left",color:cell.color||T.text,fontWeight:cell.bold?700:400,fontSize:cell.xl?18:cell.lg?14:cell.sm?10:12,whiteSpace:cell.isRef?"nowrap":cell.sm?"normal":"nowrap",maxWidth:cell.sm?220:undefined}}>
                      {cell.isRef?<RefBadge value={cell.v}/>:cell.v}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {footRow&&<tfoot><tr style={FOOT}>{footRow.map(function(cell,ci){return <td key={ci} style={{...TD,textAlign:cell.right?"right":"left",color:cell.color||T.goldLight,fontWeight:700,fontSize:cell.xl?20:cell.lg?15:12}}>{cell.v}</td>;})}</tr></tfoot>}
      </table>
    </div>
  );
}

// ─── Upload Screen ────────────────────────────────────────────────────────────
function UploadScreen({onData,onSample}) {
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState("");
  const [error,setError]=useState("");
  const [drag,setDrag]=useState(false);
  const fileRef=useRef();

  useEffect(function(){
    if(!loading) return;
    const msgs=["Reading plans...","Measuring rooms...","Counting windows...","Checking doors...","Scanning plumbing...","Scanning electrical...","Calculating flooring...","Calculating drywall..."];
    let idx=0; setMsg(msgs[0]);
    const iv=setInterval(function(){idx=(idx+1)%msgs.length;setMsg(msgs[idx]);},1800);
    return function(){clearInterval(iv);};
  },[loading]);

  function processFile(file) {
    if(!file) return;
    const reader=new FileReader();
    reader.onload=function(ev){
      const b64=ev.target.result.split(",")[1];
      setLoading(true); setError("");
     fetch("https://hivesta-backend.onrender.com/api/analyze", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ pdfBase64:b64 })
      })
      .then(function(r){
        return r.json().then(function(body){
          if(!r.ok) throw new Error(body.error || "Analysis failed.");
          return body;
        });
      })
      .then(function(res){
        if(res.error) throw new Error(res.error.message);
        const raw=(res.content||[]).map(function(c){return c.type==="text"?c.text:"";}).join("").replace(/```json/g,"").replace(/```/g,"").trim();
        const parsed=JSON.parse(raw);
        if(!Array.isArray(parsed.rooms)||parsed.rooms.length===0) throw new Error("No rooms found in plan");
        onData(parsed);
      })
      .catch(function(err){setError(err.message||"Analysis failed.");})
      .finally(function(){setLoading(false);});
    };
    reader.readAsDataURL(file);
  }

  return (
    <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
      {/* Top-left logo */}
      <div style={{position:"fixed",top:16,left:20,zIndex:100}}>
        <img src={LOGO_B64} alt="Hivesta Construction" style={{width:48,height:"auto"}}/>
      </div>
      {/* Centered upload area */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
      <div style={{width:"100%",maxWidth:500,padding:"0 24px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:36,fontWeight:900,letterSpacing:8,color:T.gold,marginBottom:2}}>HIVESTA</div>
          <div style={{fontSize:10,letterSpacing:8,color:"#B8960C",fontWeight:600,textTransform:"uppercase"}}>Takeoff Pro</div>
          <div style={{width:60,height:1,background:`linear-gradient(90deg,transparent,${T.gold},transparent)`,margin:"14px auto 0"}}/>
        </div>
        <div
          onDragOver={function(e){e.preventDefault();setDrag(true);}}
          onDragLeave={function(){setDrag(false);}}
          onDrop={function(e){e.preventDefault();setDrag(false);processFile(e.dataTransfer.files[0]);}}
          onClick={function(){if(!loading)fileRef.current.click();}}
          style={{border:`1px solid ${drag?T.gold:T.borderGold}`,borderRadius:8,padding:"52px 28px",textAlign:"center",cursor:loading?"wait":"pointer",background:"#0D0D0D",boxShadow:drag?`0 0 30px #55555540`:"none"}}
        >
          {loading
            ?<><div style={{width:36,height:36,border:`3px solid ${T.border}`,borderTopColor:T.gold,borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto"}}/><div style={{color:T.gold,fontSize:14,fontWeight:600,marginTop:18,letterSpacing:1}}>{msg}</div></>
            :<><div style={{fontSize:32,marginBottom:12,color:T.goldDim}}>↑</div><div style={{color:T.goldLight,fontSize:16,fontWeight:700,letterSpacing:1}}>Upload PDF Floor Plans</div><div style={{color:T.textMuted,fontSize:12,marginTop:6}}>Drag & drop or click to browse</div></>
          }
          <input ref={fileRef} type="file" accept=".pdf" style={{display:"none"}} onChange={function(e){if(e.target.files[0])processFile(e.target.files[0]);}}/>
        </div>
        {error&&(
          <div style={{background:"#1A0000",border:"1px solid #500",borderRadius:6,padding:12,marginTop:12,color:"#F88",fontSize:12}}>
            {error}
            <div style={{marginTop:8}}><button onClick={function(){setError("");onSample();}} style={{background:"#500",border:"none",color:"#fff",padding:"5px 14px",borderRadius:4,fontSize:11,cursor:"pointer"}}>Load Sample Instead</button></div>
          </div>
        )}
        <div style={{textAlign:"center",marginTop:20}}>
          <button onClick={onSample} style={{background:"transparent",border:`1px solid ${T.borderGold}`,color:T.gold,cursor:"pointer",fontSize:11,fontFamily:"inherit",padding:"10px 32px",borderRadius:4,fontWeight:700,letterSpacing:2}}>LOAD SAMPLE</button>
        </div>
        <div style={{textAlign:"center",marginTop:32,fontSize:11,color:T.textMuted}}>
          <a href="https://www.hivestaconstruction.com" target="_blank" rel="noopener noreferrer" style={{color:T.goldDim,textDecoration:"none"}}>www.hivestaconstruction.com</a>{" · "}
          <a href="tel:6892543553" style={{color:T.goldDim,textDecoration:"none"}}>(689) 254-3553</a>
        </div>
      </div>
      </div>
      <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────
function ResultsScreen({data,onNewPlan}) {
  const [tab,setTab]=useState("measurements");
  const [emailModal,setEmailModal]=useState(false);
  const [emailAddr,setEmailAddr]=useState("");

  const rooms     =Array.isArray(data.rooms)?data.rooms:[];
  const wd        =Array.isArray(data.windows_doors)?data.windows_doors:[];
  const plumbing  =Array.isArray(data.plumbing)?data.plumbing:[];
  const electrical=Array.isArray(data.electrical)?data.electrical:[];
  const at        =(data.area_tabulation&&typeof data.area_tabulation==="object")?data.area_tabulation:{};
  const ceilingHt =Number(data.ceiling_height_ft)||10;
  const fl        =(data.flooring&&typeof data.flooring==="object")?data.flooring:{};
  const flDetails =Array.isArray(fl.details)?fl.details:[];
  const dw        =calcDrywall(rooms,ceilingHt,at);

  function byCat(cat){return rooms.filter(r=>r.category===cat).reduce((s,r)=>s+(Number(r.sqft_interior)||0),0);}
  const livingSF=byCat("living"), garageSF=byCat("garage"), lanaiSF=byCat("lanai");
  const totalInteriorSF=livingSF+garageSF+lanaiSF;
  const lR=(Number(at.living)&&livingSF)?Number(at.living)/livingSF:1;
  const gR=(Number(at.garage)&&garageSF)?Number(at.garage)/garageSF:1;
  const nR=(Number(at.lanai)&&lanaiSF)?Number(at.lanai)/lanaiSF:1;
  function roomGross(r){const ratio=r.category==="garage"?gR:r.category==="lanai"?nR:lR;return Math.round((r.sqft_interior||0)*ratio);}
  const totalGrossSF=rooms.reduce((s,r)=>s+roomGross(r),0);
  const planUnderRoof=Number(at.total_under_roof)||totalGrossSF;

  function countType(type){return wd.filter(w=>String(w.type).trim()===type).reduce((s,w)=>s+(Number(w.qty)||0),0);}

  // Electrical summary - keyword match
  function eCount(kw){return electrical.filter(e=>e.item.toLowerCase().includes(kw.toLowerCase())).reduce((s,e)=>s+(Number(e.qty)||0),0);}
  const elecSummary=[
    {label:"Ceiling Fans",          value:eCount("ceiling fan")},
    {label:"Chandeliers",            value:eCount("chandelier")},
    {label:"Coach / Ext. Lights",    value:eCount("coach")+eCount("weatherproof")+eCount("W/P")},
    {label:"Exhaust Fans",           value:eCount("exhaust")},
    {label:"Smoke / CO Detectors",   value:eCount("smoke")},
    {label:"Garage Door Openers",    value:eCount("opener")},
    {label:"AC Units",               value:eCount("AC unit")+eCount("ac unit")},
    {label:"Thermostats",            value:eCount("thermostat")},
    {label:"Door Bells",             value:eCount("bell")},
    {label:"Panels",                 value:eCount("panel")},
  ].filter(x=>x.value>0);

  // Plumbing summary - keyword match
  function pCount(kw){return plumbing.filter(p=>p.item.toLowerCase().includes(kw.toLowerCase())).reduce((s,p)=>s+(Number(p.qty)||0),0);}
  const plumbSummary=[
    {label:"Toilets",         value:pCount("toilet")},
    {label:"Sinks / Lav.",    value:pCount("sink")+pCount("lavatory")},
    {label:"Walk-In Showers", value:pCount("walk in")+pCount("walk-in")},
    {label:"Tub / Shower",    value:pCount("tub")},
    {label:"Dishwashers",     value:pCount("dishwasher")},
    {label:"Washer Boxes",    value:pCount("washer box")},
    {label:"Water Heaters",   value:pCount("water heater")},
  ].filter(x=>x.value>0);

  // Split garage doors: 16ft (wide/double) vs smaller (single/side)
  const allGarageDoors = wd.filter(w=>String(w.type).trim()==="garage_door");
  const garageDr16 = allGarageDoors
    .filter(w=>String(w.size||w.item).includes("16"))
    .reduce((s,w)=>s+(Number(w.qty)||0),0);
  const garageDrSmall = allGarageDoors
    .filter(w=>!String(w.size||w.item).includes("16"))
    .reduce((s,w)=>s+(Number(w.qty)||0),0);
  const totalGarageDoors = allGarageDoors.reduce((s,w)=>s+(Number(w.qty)||0),0);

  const stats=[
    {label:"Ceiling",    value:ceilingHt+"'"},
    {label:"Living",     value:numFmt(Number(at.living)||livingSF)+" sf"},
    {label:"Garage",     value:numFmt(Number(at.garage)||garageSF)+" sf"},
    {label:"Lanai",      value:numFmt(Number(at.lanai)||lanaiSF)+" sf"},
    {label:"Under Roof", value:numFmt(planUnderRoof)+" sf"},
    {label:"Windows",    value:countType("window")},
    {label:"Sliders",    value:countType("sliding_door")},
    {label:"Entry Drs",  value:countType("entry_door")},
    {label:"Int Doors",  value:countType("interior_door")},
    {label:"Garage Drs", value:totalGarageDoors},
  ];

  const TABS=[
    {key:"measurements",label:"Rooms"},
    {key:"windows",     label:"Doors & Windows"},
    {key:"flooring",    label:"Flooring"},
    {key:"plumbing",    label:"Plumbing"},
    {key:"electrical",  label:"Electrical"},
    {key:"drywall",     label:"Drywall"},
    {key:"foundation",  label:"Foundation"},
  ];

  const WD_TYPES=[
    {key:"window",       label:"Windows"},
    {key:"sliding_door", label:"Sliding Glass Doors"},
    {key:"entry_door",   label:"Entry Doors"},
    {key:"interior_door",label:"Interior Doors"},
    {key:"garage_door",  label:"Garage Doors"},
  ];

  const DW_MATERIALS=[
    {name:"Sheetrock 4x12 (1/2 in)", desc:"Main order - walls & ceilings",    qty:dw.s12,      unit:"sheets"},
    {name:"Sheetrock 4x8 (1/2 in)",  desc:"15% of 4x12 - cuts & small areas", qty:dw.s8,       unit:"sheets"},
    {name:"Durock 4x8 (1/2 in)",     desc:"Cement board - wet areas only",     qty:dw.dur,      unit:"sheets"},
    {name:"ProForm Compound",         desc:"61.7 LB bucket",                    qty:dw.compound, unit:"buckets"},
    {name:"ProForm Joint Tape",       desc:"250 ft roll",                       qty:dw.tape,     unit:"rolls"},
    {name:"Corner Bead 10ft",         desc:"Galvanized",                        qty:dw.bead,     unit:"pcs"},
  ];

  function Btn({children,onClick,gold}){
    return <button onClick={onClick} style={{padding:"6px 14px",borderRadius:4,cursor:"pointer",fontSize:10,fontWeight:700,fontFamily:"inherit",background:gold?T.gold:"transparent",color:gold?T.bg:T.gold,border:`1px solid ${T.borderGold}`,letterSpacing:0.5}}>{children}</button>;
  }

  return (
    <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",color:T.text}}>
      <div style={{maxWidth:980,margin:"0 auto",padding:"0 16px"}}>

        {/* Nav */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <img src={LOGO_B64} alt="Hivesta" style={{width:40,height:"auto"}}/>
            <div style={{width:1,height:28,background:T.border}}/>
            <div>
              <div style={{fontSize:13,fontWeight:900,letterSpacing:3,color:T.gold}}>HIVESTA</div>
              <div style={{fontSize:8,letterSpacing:3,color:"#B8960C",textTransform:"uppercase",fontWeight:600}}>Takeoff Pro</div>
            </div>
            <div style={{width:1,height:28,background:T.border}}/>
            <div style={{fontSize:11,color:T.textDim}}><b style={{color:T.goldLight}}>{data.plan_name}</b> · {data.address}</div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <Btn onClick={function(){doExportCSV(data,dw);}}>Export CSV</Btn>
            <Btn onClick={function(){setEmailModal(true);}}>Email</Btn>
            <Btn gold onClick={onNewPlan}>New Plan</Btn>
          </div>
        </div>

        {/* Stats */}
        {/* Stats row 1: area */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,marginTop:10,background:T.border,borderRadius:"6px 6px 0 0",overflow:"hidden"}}>
          {stats.slice(0,5).map(function(s){return(
            <div key={s.label} style={{background:T.surface,padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:15,fontWeight:800,color:T.goldLight}}>{s.value}</div>
              <div style={{fontSize:7,color:T.textMuted,letterSpacing:0.8,textTransform:"uppercase",marginTop:2}}>{s.label}</div>
            </div>
          );})}
        </div>
        {/* Stats row 2: openings */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,marginBottom:10,background:T.border,borderRadius:"0 0 6px 6px",overflow:"hidden",borderTop:"1px solid #1A1000"}}>
          {stats.slice(5,10).map(function(s){return(
            <div key={s.label} style={{background:"#0E0E00",padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:15,fontWeight:800,color:T.gold}}>{s.value}</div>
              <div style={{fontSize:7,color:T.textMuted,letterSpacing:0.8,textTransform:"uppercase",marginTop:2}}>{s.label}</div>
            </div>
          );})}
        </div>
        <GoldLine/>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,marginBottom:12,overflowX:"auto"}}>
          {TABS.map(function(tb){
            const active=tab===tb.key;
            return <button key={tb.key} onClick={function(){setTab(tb.key);}} style={{background:"none",border:"none",color:active?T.goldLight:T.textDim,padding:"10px 16px",fontSize:12,fontWeight:active?900:600,cursor:"pointer",borderBottom:active?`2px solid ${T.gold}`:"2px solid transparent",fontFamily:"inherit",whiteSpace:"nowrap",letterSpacing:0.5}}>{tb.label}</button>;
          })}
        </div>

        {/* ── ROOMS ── */}
        {tab==="measurements"&&(
          <>
            <SectionCard title="Area Summary - Interior vs Including Walls">
              <DataTable
                cols={[{label:"Area"},{label:"Interior SF (excl. walls)",right:true},{label:"Gross SF (incl. walls)",right:true},{label:"Difference",right:true}]}
                rows={[
                  [{v:"Living",bold:true,color:T.goldLight},{v:numFmt(livingSF)+" sf",right:true,bold:true},{v:Number(at.living)?numFmt(at.living)+" sf":"--",right:true,color:T.textDim},{v:Number(at.living)?"+"+numFmt(Number(at.living)-livingSF)+" sf":"--",right:true,color:T.textMuted}],
                  [{v:"Garage",bold:true,color:T.goldLight},{v:numFmt(garageSF)+" sf",right:true,bold:true},{v:Number(at.garage)?numFmt(at.garage)+" sf":"--",right:true,color:T.textDim},{v:Number(at.garage)?"+"+numFmt(Number(at.garage)-garageSF)+" sf":"--",right:true,color:T.textMuted}],
                  [{v:"Lanai", bold:true,color:T.goldLight},{v:numFmt(lanaiSF)+" sf", right:true,bold:true},{v:Number(at.lanai) ?numFmt(at.lanai)+" sf" :"--",right:true,color:T.textDim},{v:Number(at.lanai) ?"+"+numFmt(Number(at.lanai)-lanaiSF)+" sf" :"--",right:true,color:T.textMuted}],
                ]}
                footRow={[
                  {v:"TOTAL",bold:true},
                  {v:numFmt(totalInteriorSF)+" sf",right:true,bold:true},
                  {v:numFmt(planUnderRoof)+" sf",right:true,bold:true},
                  {v:"+"+numFmt(planUnderRoof-totalInteriorSF)+" sf",right:true,color:T.textMuted},
                ]}
              />
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <div style={{flex:1,background:"#0D0D00",border:`1px solid ${T.border}`,borderRadius:4,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:900,color:T.goldLight}}>{numFmt(totalInteriorSF)} sf</div>
                  <div style={{fontSize:9,color:T.textMuted,textTransform:"uppercase",letterSpacing:1,marginTop:3}}>Interior SF (sum of room labels, excl. walls)</div>
                </div>
                <div style={{flex:1,background:"#0D0D00",border:`1px solid ${T.borderGold}`,borderRadius:4,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:900,color:T.gold}}>{numFmt(planUnderRoof)} sf</div>
                  <div style={{fontSize:9,color:T.textMuted,textTransform:"uppercase",letterSpacing:1,marginTop:3}}>Under Roof (plan tabulation, incl. walls) - MASTER</div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Room-by-Room" noPad>
              <DataTable
                cols={[{label:"Room / Space"},{label:"Length"},{label:"Width"},{label:"Interior SF",right:true},{label:"Gross SF (incl. walls)",right:true},{label:"Plan Ref"}]}
                rows={rooms.map(function(room){
                  return [
                    {v:room.name,bold:true},
                    {v:room.length,color:T.textDim},
                    {v:room.width,color:T.textDim},
                    {v:room.sqft_interior?numFmt(room.sqft_interior)+" sf":"--",right:true,bold:true,color:T.goldLight},
                    {v:roomGross(room)?"~"+numFmt(roomGross(room))+" sf":"--",right:true,color:T.textDim},
                    {v:room.ref,isRef:true},
                  ];
                })}
                footRow={[
                  {v:"Totals",bold:true},{v:""},{v:""},
                  {v:numFmt(totalInteriorSF)+" sf",right:true,bold:true},
                  {v:"~"+numFmt(planUnderRoof)+" sf",right:true,color:T.textDim},
                  {v:""},
                ]}
              />
            </SectionCard>
          </>
        )}

        {/* ── DOORS & WINDOWS ── */}
        {tab==="windows"&&(
          <>
          {/* Garage door breakdown summary */}
          {totalGarageDoors>0&&(
            <SectionCard title="Garage Door Summary">
              <div style={{display:"flex",gap:8}}>
                <div style={{flex:1,background:"#0D0D00",border:`1px solid ${T.borderGold}`,borderRadius:4,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:26,fontWeight:900,color:T.gold}}>{garageDr16}</div>
                  <div style={{fontSize:9,color:T.textMuted,textTransform:"uppercase",letterSpacing:1,marginTop:3}}>16 ft Wide Door(s)</div>
                </div>
                <div style={{flex:1,background:"#0D0D00",border:`1px solid ${T.border}`,borderRadius:4,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:26,fontWeight:900,color:T.goldLight}}>{garageDrSmall}</div>
                  <div style={{fontSize:9,color:T.textMuted,textTransform:"uppercase",letterSpacing:1,marginTop:3}}>Under 16 ft Door(s)</div>
                </div>
                <div style={{flex:1,background:"#0D0D00",border:`1px solid ${T.border}`,borderRadius:4,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:26,fontWeight:900,color:T.text}}>{totalGarageDoors}</div>
                  <div style={{fontSize:9,color:T.textMuted,textTransform:"uppercase",letterSpacing:1,marginTop:3}}>Total Garage Doors</div>
                </div>
              </div>
            </SectionCard>
          )}
          <SectionCard title="Windows, Doors & Openings" noPad>
            {WD_TYPES.map(function(wdType){
              const items=wd.filter(w=>w.type===wdType.key);
              if(items.length===0) return null;
              const typeTotal=items.reduce((s,w)=>s+(Number(w.qty)||0),0);
              return (
                <div key={wdType.key}>
                  <div style={{padding:"7px 16px",background:"#0D0D00",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",fontSize:11}}>
                    <b style={{color:T.gold}}>{wdType.label}</b><b style={{color:T.goldLight,fontSize:14}}>{typeTotal}</b>
                  </div>
                  <DataTable
                    cols={[{label:"Item"},{label:"Size"},{label:"Location"},{label:"Qty",right:true},{label:"Reference"}]}
                    rows={items.map(function(item){return [{v:item.item,bold:true},{v:item.size,color:T.textDim},{v:item.location,color:T.textDim},{v:item.qty,right:true,bold:true,color:T.goldLight,lg:true},{v:item.ref,isRef:true}];})}
                  />
                </div>
              );
            })}
            <div style={{padding:"10px 16px",borderTop:`1px solid ${T.borderGold}`,background:"#0D0D00",display:"flex",justifyContent:"space-between"}}>
              <b style={{color:T.gold,fontSize:11,letterSpacing:1}}>TOTAL OPENINGS</b>
              <b style={{fontSize:18,color:T.goldLight}}>{wd.reduce((s,w)=>s+(Number(w.qty)||0),0)}</b>
            </div>
          </SectionCard>
          </>
        )}

        {/* ── FLOORING ── */}
        {tab==="flooring"&&(
          <>
            {/* Master Summary */}
            <SectionCard title="Flooring & Tile — Master Summary">
              <SummaryGrid items={[
                {label:"Interior Floors",  value:numFmt(Number(fl.interior_floor_sf)||0)+" sf"},
                {label:"Bath Floor Tile",  value:numFmt(Number(fl.bath_floor_sf)||0)+" sf"},
                {label:"Shower Wall Tile", value:numFmt(Number(fl.bath_wall_tile_sf)||0)+" sf"},
                {label:"Shower Floor",     value:numFmt(Number(fl.shower_floor_sf)||0)+" sf"},
                {label:"Exterior Tile",    value:numFmt(Number(fl.exterior_tile_sf)||0)+" sf"},
              ]}/>
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,paddingTop:8,borderTop:`1px solid ${T.border}`,color:T.goldLight}}>
                <span>Total All Tile / Flooring</span>
                <span>{numFmt((Number(fl.interior_floor_sf)||0)+(Number(fl.bath_floor_sf)||0)+(Number(fl.bath_wall_tile_sf)||0)+(Number(fl.shower_floor_sf)||0)+(Number(fl.exterior_tile_sf)||0))} sf</span>
              </div>
              <div style={{marginTop:6,fontSize:10,color:T.textMuted}}>* Add 10-15% waste for cuts on all tile orders.</div>
            </SectionCard>

            {/* Per-Bathroom breakdown */}
            {(function(){
              // Group flDetails by bathroom
              const bathGroups = {};
              const otherRows = [];
              (flDetails||[]).forEach(function(row){
                const a = (row.area||"").toLowerCase();
                const t = (row.type||"").toLowerCase();
                let bathKey = null;
                if (a.includes("master bath"))         bathKey = "Master Bath";
                else if (a.includes("on suite bath"))  bathKey = "Bath 2 (On Suite)";
                else if (a.includes("guest bath"))     bathKey = "Bath 3 (Guest Bath)";
                else if (a.includes("half bath"))      bathKey = "Bath 4 (Half Bath)";

                if (bathKey) {
                  if (!bathGroups[bathKey]) bathGroups[bathKey]={rows:[],floorSF:0,wallSF:0,showerFloorSF:0,tubSF:0};
                  bathGroups[bathKey].rows.push(row);
                  if      (t==="shower floor")                                    bathGroups[bathKey].showerFloorSF += Number(row.sqft)||0;
                  else if (t==="shower wall tile" || t==="wall tile")             bathGroups[bathKey].wallSF        += Number(row.sqft)||0;
                  else if (t==="tub tile")                                        bathGroups[bathKey].tubSF         += Number(row.sqft)||0;
                  else if (t==="bath floor tile")                                 bathGroups[bathKey].floorSF       += Number(row.sqft)||0;
                } else {
                  otherRows.push(row);
                }
              });

              const bathOrder = ["Master Bath","Bath 2 (On Suite)","Bath 3 (Guest Bath)","Bath 4 (Half Bath)"];
              const bathTypeLabel = {
                "Master Bath": "Walk-In Shower (NO Tub)",
                "Bath 2 (On Suite)": "Tub / Shower Combo",
                "Bath 3 (Guest Bath)": "Tub / Shower Combo",
                "Bath 4 (Half Bath)": "Toilet + Sink Only (No Tub / No Shower)",
              };
              const bathColor = {
                "Master Bath": T.gold,
                "Bath 2 (On Suite)": T.goldLight,
                "Bath 3 (Guest Bath)": T.goldLight,
                "Bath 4 (Half Bath)": T.textDim,
              };

              return (
                <>
                  {bathOrder.map(function(bk){
                    const bg = bathGroups[bk];
                    if (!bg||!bg.rows.length) return null;
                    const hasShower = bk==="Master Bath";
                    const hasTub = bk==="Bath 2 (On Suite)"||bk==="Bath 3 (Guest Bath)";
                    return (
                      <SectionCard key={bk} title={bk + " — " + bathTypeLabel[bk]}>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
                          {/* Floor tile */}
                          <div style={{background:"#0D0D00",border:`1px solid ${T.border}`,borderRadius:4,padding:"8px 10px",textAlign:"center"}}>
                            <div style={{fontSize:18,fontWeight:800,color:T.goldLight}}>{numFmt(bg.floorSF)} sf</div>
                            <div style={{fontSize:8,color:T.textMuted,textTransform:"uppercase",marginTop:2}}>Floor Tile</div>
                          </div>
                          {/* Shower walls OR tub surround */}
                          {hasShower&&(
                            <div style={{background:"#0D0D00",border:`1px solid ${T.gold}`,borderRadius:4,padding:"8px 10px",textAlign:"center"}}>
                              <div style={{fontSize:18,fontWeight:800,color:T.gold}}>{numFmt(bg.wallSF)} sf</div>
                              <div style={{fontSize:8,color:T.textMuted,textTransform:"uppercase",marginTop:2}}>Shower Wall Tile (full height)</div>
                            </div>
                          )}
                          {hasTub&&(
                            <div style={{background:"#0D0D00",border:`1px solid ${T.borderGold}`,borderRadius:4,padding:"8px 10px",textAlign:"center"}}>
                              <div style={{fontSize:18,fontWeight:800,color:T.goldLight}}>{numFmt(bg.tubSF)} sf</div>
                              <div style={{fontSize:8,color:T.textMuted,textTransform:"uppercase",marginTop:2}}>Tub Surround Tile (excl. tub height)</div>
                            </div>
                          )}
                          {/* Shower floor (master bath only) */}
                          {hasShower&&(
                            <div style={{background:"#0D0D00",border:`1px solid ${T.borderGold}`,borderRadius:4,padding:"8px 10px",textAlign:"center"}}>
                              <div style={{fontSize:18,fontWeight:800,color:T.goldLight}}>{numFmt(bg.showerFloorSF)} sf</div>
                              <div style={{fontSize:8,color:T.textMuted,textTransform:"uppercase",marginTop:2}}>Shower Floor Tile (separate order)</div>
                            </div>
                          )}
                          {/* Wall tile for non-shower baths */}
                          {!hasShower&&bg.wallSF>0&&(
                            <div style={{background:"#0D0D00",border:`1px solid ${T.border}`,borderRadius:4,padding:"8px 10px",textAlign:"center"}}>
                              <div style={{fontSize:18,fontWeight:800,color:T.textDim}}>{numFmt(bg.wallSF)} sf</div>
                              <div style={{fontSize:8,color:T.textMuted,textTransform:"uppercase",marginTop:2}}>Wall Tile</div>
                            </div>
                          )}
                        </div>
                        {/* Note */}
                        <div style={{fontSize:10,color:T.textMuted,padding:"4px 0"}}>
                          {hasShower&&"Shower wall tile = full height. Shower floor = separate smaller tile. Order separately."}
                          {hasTub&&"Tub surround tile measured above tub rim only — does NOT include tub body height. Order tub tiles separately from floor tiles."}
                          {bk==="Bath 4 (Half Bath)"&&"No tub or shower. Floor tile + accent wall tile only."}
                        </div>
                        {/* Detail rows */}
                        <DataTable
                          cols={[{label:"Area"},{label:"Tile Type"},{label:"Sq Ft",right:true},{label:"Ref"}]}
                          rows={bg.rows.map(function(row){return [{v:row.area,bold:true},{v:row.type,color:T.textDim},{v:numFmt(row.sqft)+" sf",right:true,bold:true,color:T.goldLight},{v:row.ref,isRef:true}];})}
                        />
                      </SectionCard>
                    );
                  })}

                  {/* All other flooring */}
                  {otherRows.length>0&&(
                    <SectionCard title="Living Areas, Lanai & Exterior" noPad>
                      <DataTable
                        cols={[{label:"Area"},{label:"Type"},{label:"Sq Ft",right:true},{label:"Ref"}]}
                        rows={otherRows.map(function(row){return [{v:row.area,bold:true},{v:row.type,color:T.textDim},{v:numFmt(row.sqft)+" sf",right:true,bold:true,color:T.goldLight},{v:row.ref,isRef:true}];})}
                        footRow={[{v:"Total",bold:true},{v:""},{v:numFmt(otherRows.reduce((s,f)=>s+(Number(f.sqft)||0),0))+" sf",right:true,bold:true},{v:""}]}
                      />
                    </SectionCard>
                  )}
                </>
              );
            })()}
          </>
        )}

        {/* ── PLUMBING ── */}
        {tab==="plumbing"&&(
          <>
            <SectionCard title="Plumbing Fixture Count Summary">
              <SummaryGrid items={plumbSummary}/>
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,paddingTop:8,borderTop:`1px solid ${T.border}`,color:T.goldLight}}>
                <span>Total Fixtures</span>
                <span>{plumbing.reduce((s,p)=>s+(Number(p.qty)||0),0)}</span>
              </div>
            </SectionCard>
            <SectionCard title="Plumbing Fixture Schedule" noPad>
              <DataTable
                cols={[{label:"Fixture"},{label:"Location"},{label:"Qty",right:true},{label:"Plan Ref"}]}
                rows={plumbing.map(function(row){return [{v:row.item,bold:true},{v:row.location,color:T.textDim},{v:row.qty,right:true,bold:true,color:T.goldLight},{v:row.ref,isRef:true}];})}
                footRow={[{v:"Total",bold:true},{v:""},{v:plumbing.reduce((s,p)=>s+(Number(p.qty)||0),0),right:true,bold:true},{v:""}]}
              />
            </SectionCard>
          </>
        )}

        {/* ── ELECTRICAL ── */}
        {tab==="electrical"&&(function(){
          // Plain-language grouping
          const eGroups = [
            { label:"Ceiling Fans",          icon:"🌀", keywords:["ceiling fan","fan junction","junction box for fan"] },
            { label:"Chandeliers",           icon:"💡", keywords:["chandelier"] },
            { label:"Pendant Lights",        icon:"💡", keywords:["pendant"] },
            { label:"Recessed Can Lights",   icon:"⭕", keywords:["recessed","downlight","can light"] },
            { label:"Coach / Exterior Lights",icon:"🏮",keywords:["coach","weatherproof","w/p","exterior light","bulkhead"] },
            { label:"Exhaust Fans",          icon:"💨", keywords:["exhaust fan","mechanical fan"] },
            { label:"Smoke / CO Detectors",  icon:"🔴", keywords:["smoke","detector","co "] },
            { label:"Garage Door Openers",   icon:"🚪", keywords:["opener","garage door opener"] },
            { label:"AC / HVAC Units",       icon:"❄️", keywords:["ac unit","hvac","air condition"] },
            { label:"Thermostats",           icon:"🌡️", keywords:["thermostat"] },
            { label:"Door Bells",            icon:"🔔", keywords:["bell","chime"] },
            { label:"Electrical Panels",     icon:"⚡", keywords:["panel","200a","distribution"] },
            { label:"Water Heaters",         icon:"🔥", keywords:["water heater"] },
          ];

          const matched = new Set();
          const groupTotals = eGroups.map(function(g){
            const total = electrical.filter(function(e){
              const name = (e.item||"").toLowerCase();
              return g.keywords.some(function(k){ return name.includes(k); });
            }).reduce(function(s,e){ matched.add(e.item); return s+(Number(e.qty)||0); },0);
            return {...g, total};
          }).filter(g=>g.total>0);

          const unmatched = electrical.filter(e=>!matched.has(e.item));

          return (
            <>
              <SectionCard title="Electrical — What to Buy">
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:8}}>
                  {groupTotals.map(function(g){
                    return (
                      <div key={g.label} style={{background:"#0D0D00",border:`1px solid ${T.border}`,borderRadius:6,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:22}}>{g.icon}</span>
                        <div>
                          <div style={{fontSize:20,fontWeight:900,color:T.goldLight}}>{g.total}</div>
                          <div style={{fontSize:9,color:T.textMuted,textTransform:"uppercase",letterSpacing:0.5}}>{g.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,paddingTop:8,borderTop:`1px solid ${T.border}`,color:T.goldLight}}>
                  <span>Total Devices</span>
                  <span>{electrical.reduce((s,e)=>s+(Number(e.qty)||0),0)}</span>
                </div>
              </SectionCard>
              <SectionCard title="Full Electrical Schedule" noPad>
                <DataTable
                  cols={[{label:"Device / Fixture"},{label:"Location"},{label:"Qty",right:true},{label:"Plan Ref"}]}
                  rows={electrical.map(function(row){return [{v:row.item,bold:true},{v:row.location,color:T.textDim},{v:row.qty,right:true,bold:true,color:T.goldLight},{v:row.ref,isRef:true}];})}
                  footRow={[{v:"Total",bold:true},{v:""},{v:electrical.reduce((s,e)=>s+(Number(e.qty)||0),0),right:true,bold:true},{v:""}]}
                />
              </SectionCard>
            </>
          );
        })()}

        {/* ── FOUNDATION ── */}
        {tab==="foundation"&&(function(){
          const fd = (data.foundation&&data.foundation.stages)?data.foundation:{stages:[]};
          const perimLF = (data.foundation&&data.foundation.perimeter_lf)||0;
          const slabSF  = (data.foundation&&data.foundation.slab_sf)||0;
          const wallSF  = (data.foundation&&data.foundation.wall_sf)||0;

          const stageColors = ["#D4A017","#F0C040","#B8860B","#7A5C00"];

          return (
            <>
              {/* Key metrics */}
              <SectionCard title="Foundation Key Measurements">
                <SummaryGrid items={[
                  {label:"Perimeter", value:perimLF+" LF"},
                  {label:"Slab Area", value:numFmt(slabSF)+" SF"},
                  {label:"Wall Area", value:numFmt(wallSF)+" SF"},
                  {label:"Ceiling Ht",value:ceilingHt+"'"},
                ]}/>
              </SectionCard>

              {/* Each stage */}
              {fd.stages.map(function(stage, si){
                const stageTotal = stage.items.reduce((s,i)=>s+(Number(i.qty)||0),0);
                const col = stageColors[si]||T.gold;
                return (
                  <SectionCard key={stage.stage} title={stage.stage} noPad>
                    <div style={{overflowX:"auto"}}>
                      <table style={{width:"100%",borderCollapse:"collapse"}}>
                        <thead>
                          <tr>
                            <th style={{...{padding:"7px 12px",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`,background:"#0D0D00"},textAlign:"left",color:col}}>Activity / Material</th>
                            <th style={{...{padding:"7px 12px",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`,background:"#0D0D00"},textAlign:"right",color:T.goldDim}}>QTY</th>
                            <th style={{...{padding:"7px 12px",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`,background:"#0D0D00"},textAlign:"left",color:T.goldDim}}>Unit</th>
                            <th style={{...{padding:"7px 12px",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`,background:"#0D0D00"},textAlign:"left",color:T.gold}}>Plan Ref</th>
                            <th style={{...{padding:"7px 12px",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`,background:"#0D0D00"},textAlign:"left",color:T.goldDim}}>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stage.items.map(function(item, ii){
                            const isTotal = item.activity==="Total"||item.activity==="";
                            return (
                              <tr key={ii} style={{borderBottom:`1px solid ${T.border}`,background:ii%2===0?T.surface:"#0E0E00"}}>
                                <td style={{padding:"7px 12px",fontSize:12,fontWeight:isTotal?700:500,color:isTotal?col:T.text}}>{item.activity}</td>
                                <td style={{padding:"7px 12px",fontSize:isTotal?16:13,fontWeight:700,textAlign:"right",color:isTotal?col:T.goldLight}}>{item.qty>0?numFmt(item.qty):""}</td>
                                <td style={{padding:"7px 12px",fontSize:11,color:T.textDim}}>{item.unit}</td>
                                <td style={{padding:"7px 12px",fontSize:10,whiteSpace:"nowrap"}}>{item.ref?<span style={{display:"inline-block",background:"#1A1500",border:`1px solid ${T.goldDim}`,borderRadius:3,padding:"2px 6px",fontSize:9,fontWeight:600,color:T.gold}}>{item.ref}</span>:<span style={{color:T.textMuted}}>--</span>}</td>
                                <td style={{padding:"7px 12px",fontSize:10,color:T.textMuted}}>{item.note}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr style={{borderTop:`1px solid ${col}`,background:"#0D0D00"}}>
                            <td style={{padding:"8px 12px",fontWeight:700,fontSize:12,color:col}}>STAGE TOTAL ITEMS</td>
                            <td style={{padding:"8px 12px",fontWeight:900,fontSize:16,textAlign:"right",color:col}}>{stage.items.filter(i=>i.qty>0).length}</td>
                            <td style={{padding:"8px 12px",fontSize:10,color:T.textMuted}} colSpan={2}>line items in this stage</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </SectionCard>
                );
              })}

              {fd.stages.length===0&&(
                <SectionCard title="Foundation Data">
                  <div style={{textAlign:"center",padding:"32px 16px",color:T.textMuted,fontSize:13}}>
                    Foundation stage data will appear here when plans are uploaded and analyzed.<br/>
                    <span style={{fontSize:11,marginTop:8,display:"block"}}>Upload your floor plans to generate foundation takeoff quantities.</span>
                  </div>
                </SectionCard>
              )}
            </>
          );
        })()}

        {/* ── DRYWALL ── */}
        {tab==="drywall"&&(
          <SectionCard title="Drywall Materials" noPad>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:T.border}}>
              {[{label:"Ceiling Ht",value:ceilingHt+"'"},{label:"Net Wall",value:numFmt(dw.netWall)+" sf"},{label:"Ceiling Area",value:numFmt(dw.ceilSF)+" sf"},{label:"Total Area",value:numFmt(dw.dryArea)+" sf"}].map(function(item){
                return <div key={item.label} style={{background:T.surface,padding:9,textAlign:"center"}}><div style={{fontSize:15,fontWeight:800,color:T.goldLight}}>{item.value}</div><div style={{fontSize:7,color:T.textMuted,textTransform:"uppercase",marginTop:2}}>{item.label}</div></div>;
              })}
            </div>
            <DataTable
              cols={[{label:"Material"},{label:"Description"},{label:"Qty",right:true},{label:"Unit"}]}
              rows={DW_MATERIALS.map(function(row){return [{v:row.name,bold:true},{v:row.desc,color:T.textMuted,sm:true},{v:row.qty,right:true,bold:true,color:T.goldLight,lg:true},{v:row.unit,color:T.textMuted,sm:true}];})}
              footRow={[{v:"Total Sheets",bold:true},{v:""},{v:dw.tot,right:true,bold:true,xl:true},{v:"sheets",color:T.textDim}]}
            />
            {data.drywall&&data.drywall.notes&&(
              <div style={{padding:"7px 16px",borderTop:`1px solid ${T.border}`,fontSize:10,color:T.textMuted}}><b style={{color:T.textDim}}>Notes:</b> {data.drywall.notes}</div>
            )}
          </SectionCard>
        )}

        {/* Footer */}
        <div style={{textAlign:"center",padding:"24px 0 16px",borderTop:`1px solid ${T.border}`,marginTop:8}}>
          <div style={{fontSize:15,fontWeight:900,letterSpacing:5,color:T.gold}}>HIVESTA</div>
          <div style={{fontSize:9,letterSpacing:5,color:T.goldDim,marginTop:2}}>CONSTRUCTION</div>
          <div style={{marginTop:10,fontSize:11,color:T.textMuted}}>
            <a href="https://www.hivestaconstruction.com" target="_blank" rel="noopener noreferrer" style={{color:T.goldDim,textDecoration:"none"}}>www.hivestaconstruction.com</a>{" · "}
            <a href="https://www.hivestaconstruction.com/contact" target="_blank" rel="noopener noreferrer" style={{color:T.goldDim,textDecoration:"none"}}>Contact</a>{" · "}
            <a href="tel:6892543553" style={{color:T.goldDim,textDecoration:"none"}}>(689) 254-3553</a>
          </div>
          <div style={{marginTop:5,fontSize:9,color:T.textMuted}}>300 S Orange Av. Suite 1000, Orlando, FL 32801</div>
        </div>
      </div>

      {/* Email Modal */}
      {emailModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}} onClick={function(){setEmailModal(false);}}>
          <div style={{background:T.surface,border:`1px solid ${T.borderGold}`,borderRadius:8,padding:28,width:380,boxShadow:`0 20px 60px ${T.goldDim}40`}} onClick={function(e){e.stopPropagation();}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:T.goldLight,letterSpacing:1}}>Send Takeoff Report</div>
            <input value={emailAddr} onChange={function(e){setEmailAddr(e.target.value);}} placeholder="recipient@email.com" style={{width:"100%",padding:"10px 12px",border:`1px solid ${T.border}`,borderRadius:4,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",background:T.bg,color:T.text}}/>
            <div style={{display:"flex",gap:8,marginTop:14}}>
              <button onClick={function(){doExportCSV(data,dw);window.open("mailto:"+emailAddr+"?subject="+encodeURIComponent("Hivesta Takeoff - "+data.plan_name)+"&body="+encodeURIComponent("Project: "+data.plan_name+"\n"+data.address+"\n\nHIVESTA CONSTRUCTION\nwww.hivestaconstruction.com"));setEmailModal(false);}} style={{flex:1,background:T.gold,color:T.bg,border:"none",padding:10,borderRadius:4,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Download & Email</button>
              <button onClick={function(){setEmailModal(false);}} style={{padding:"10px 16px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:4,fontSize:12,cursor:"pointer",fontFamily:"inherit",color:T.textDim}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [data,setData]=useState(null);
  if(!data) return <UploadScreen onData={setData} onSample={function(){setData(SAMPLE_DATA);}}/>;
  return <ResultsScreen data={data} onNewPlan={function(){setData(null);}}/>;
}
