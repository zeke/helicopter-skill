---
name: helicopter-skill
description: >
  Fly helicopters. Use this skill whenever an agent needs to pilot, operate,
  or reason about flying a helicopter — including pre-flight checks, takeoff,
  hover, cruise, approach, landing, and emergency procedures.

  Covers two aircraft:

  Bell 212 (B-212 / UH-1N Twin Huey): the twin-engine utility helicopter
  from The Matrix, where Trinity calls Tank and says "I need a pilot program
  for a B-212 helicopter. Hurry." — and then flies.

  Bell 47: the iconic 1950s bubble-canopy helicopter — the aircraft from
  M*A*S*H, the first helicopter ever certified for civilian use, and the
  machine depicted in the accompanying short film.
---

## Origin

In The Matrix (1999), Trinity and Neo discover a helicopter on a rooftop.

> Neo: "Can you fly that thing?"
> Trinity: "Not yet. Operator. Tank, I need a pilot program for a B-212
> helicopter. Hurry."
> [seconds pass]
> Trinity: "Let's go."

This skill is that program. Load it, and fly.

Full technical specs are in `references/bell-212-specs.md` and `references/bell-47-specs.md`.

---

## Helicopters Covered

| Aircraft | Also known as | Era | Key feature |
|----------|---------------|-----|-------------|
| Bell 212 | UH-1N, Twin Huey | 1969–present | Twin-engine, 14 passengers, used in The Matrix |
| Bell 47 | H-13 Sioux, "the bubble" | 1946–1974 | First certified civilian helicopter, M*A*S*H, manual throttle |

---

# Bell 212 (B-212 / UH-1N Twin Huey)

## The Aircraft

The Bell 212 (military: UH-1N "Twin Huey") is a twin-engine medium utility helicopter powered
by a Pratt & Whitney Canada PT6T-3 Twin-Pac — two turboshaft engines coupled to a single
combining gearbox. It seats up to 14 passengers plus pilot, cruises at 104 kt, and has a
service ceiling of 17,400 ft.

Key safety feature: if one engine fails, the combining gearbox automatically commands the
surviving engine to full power. Single-engine flight is possible at max takeoff weight.

## Controls

| Control | Location | Function |
|---------|----------|----------|
| Collective | Left hand | Raises/lowers all blade pitch equally; controls altitude |
| Cyclic | Right hand (center stick) | Tilts rotor disc; controls direction and attitude |
| Anti-torque pedals | Both feet | Adjusts tail rotor pitch; controls heading/yaw |
| Throttle/Governor | Twist grip on collective | Maintains rotor RPM (97–100% NR); largely automatic |

**The fundamental rule:** every collective change demands a simultaneous pedal correction.
More power = more torque = left pedal to compensate. Less power = right pedal.

## Pre-Flight Checks

1. Walk around the aircraft. Inspect rotor blades, tail rotor, skids, engine cowlings, and fuel caps.
2. Check hydraulic fluid levels (Systems 1 and 2).
3. Confirm fuel quantity for planned flight plus reserves.
4. Verify doors are properly latched or symmetrically removed (VMC only).
5. Set collective full down, cyclic neutral, pedals centered.
6. Confirm rotor RPM governor is in AUTO.
7. Start engines per checklist; bring both engines to idle; confirm combining gearbox torque-sharing is equal.
8. Increase to flight RPM: 97–100% NR (314–324 RPM). Do not exceed 100%.

## Hover

Hovering is the most demanding phase — three axes of control must be coordinated simultaneously.

1. With collective full down and cyclic neutral, slowly raise collective.
2. As the helicopter becomes "light on skids," apply left pedal to maintain heading.
3. The right skid will lift first — correct with a small right cyclic input.
4. Achieve a stable hover at 3–5 ft AGL.
5. Maintain:
   - Altitude: collective (small, smooth inputs)
   - Heading: pedals
   - Position: cyclic

## Normal Takeoff

1. Establish a stable hover at 4 ft AGL. Perform a hover power check.
2. Smoothly apply forward cyclic. The nose pitches slightly down; the helicopter begins to move forward.
3. As forward speed increases, raise collective slightly to prevent sinking. Increase left pedal as power increases.
4. Accelerate through translational lift (~16–24 kt). You will feel a distinct improvement in
   lift efficiency. The nose tends to rise — apply forward cyclic to maintain attitude.
5. Climb at best rate of climb speed. Trim for hands-off balanced flight.
6. Do not exceed 15% above hover torque during acceleration to climb speed.

## Cruise Flight

- Cruise at 97–104 kt for most efficient range.
- Maintain heading with pedals — keep the ball centered.
- VNE: 130 kt at sea level. Decreases 3 kt per 1,000 ft above 3,000 ft density altitude.
- Monitor both engine torques — they should be equal. Asymmetry indicates a combining gearbox issue.
- Monitor rotor RPM: 97–100% NR. Low RPM is immediately dangerous.

## Approach and Landing

1. Begin descent by lowering collective. Apply right pedal as power reduces.
2. Control descent rate with collective; control forward speed with cyclic.
3. Slow to approximately 40 kt on final approach.
4. Transition to a low hover (3–5 ft AGL) over the landing zone.
5. Stabilize the hover, confirm landing area is clear.
6. Lower collective smoothly to touch down on both skids simultaneously.
7. Lower collective full down on touchdown. Do not roll back on the cyclic (blade strike risk).

## Emergency: Single Engine Failure

1. The combining gearbox automatically commands the surviving engine to full power — no action required for the power transfer.
2. Maintain altitude and heading with normal control inputs.
3. Check engine instruments to identify the failed engine.
4. Reduce power demand if operating near max gross weight.
5. Declare emergency. Proceed to nearest suitable landing area.

## Emergency: Dual Engine Failure / Autorotation

1. **Immediately** lower collective to full down. Time-critical — rotor RPM decays within seconds.
2. Establish autorotation airspeed: approximately 65–75 kt for best glide.
3. Control rotor RPM with collective: 97–100% NR.
4. At approximately 40–50 ft AGL, begin the flare: apply aft cyclic to slow forward speed.
5. At 5–10 ft AGL, level the aircraft with forward cyclic, then raise collective to cushion the landing.

## Emergency: Hydraulic System Failure

- Loss of one system: continue flight with increased but manageable control forces. Land at nearest suitable airfield.
- Loss of both systems: do not attempt maneuvers. Declare emergency and land immediately.

## Bell 212 Key Numbers

| Parameter | Value |
|-----------|-------|
| Normal rotor RPM | 97–100% NR (314–324 RPM) |
| VNE (sea level) | 130 kt |
| Best autorotation speed | 65–75 kt |
| Max gross weight | 5,080 kg / 11,200 lb |
| Initial climb rate | 1,320 ft/min |
| Service ceiling | 17,400 ft |
| Cruise speed | 104 kt |
| Capacity | 14 passengers + pilot |

---

# Bell 47 (H-13 Sioux)

## The Aircraft

The Bell 47 is a single-engine, two-blade teetering-rotor light helicopter — the world's first
certified civilian helicopter (1946) and the aircraft depicted in the short film accompanying
this skill. Instantly recognizable by its bubble canopy, exposed tubular-steel tailboom, and
clop-clop rotor sound. Best known from the opening credits of M*A*S*H, where H-13s flew
wounded soldiers on external stretcher pods strapped to the skids.

The definitive variant is the **47G-3B** with a turbocharged Lycoming TVO-435 (270–280 hp).

## Critical Difference from Modern Helicopters

**The Bell 47 has no automatic throttle correlation.** The pilot must manually coordinate
the throttle twist grip with every collective movement to maintain rotor RPM in the green arc
(322–370 RPM). This is the most significant challenge for new Bell 47 pilots.

- Collective up → twist throttle outboard to maintain RPM
- Collective down → ease throttle inboard to prevent overspeed

## Controls

| Control | Location | Function |
|---------|----------|----------|
| Collective | Left hand (pivoting lever) | Raises/lowers all blade pitch; primary altitude control |
| Throttle | Twist grip at forward end of collective | **Manual** RPM control — no auto-correlation |
| Cyclic | Right hand (center stick) | Tilts rotor disc; controls direction and attitude |
| Anti-torque pedals | Both feet | Controls heading via tail rotor pitch |

## The Stabilizer Bar (Flybar)

Arthur Young's key invention: a weighted gyroscopic bar mounted perpendicular to the rotor
blades. It mechanically damps cyclic inputs and absorbs gusts — making the Bell 47 the first
helicopter practical for general civilian use.

The bar creates a ~0.7-second lag between cyclic input and aircraft response. Pilots must
**anticipate** movements, not react to them.

**Never operate in the yellow arc on the tachometer.** A resonance frequency in this band can
damage the stabilizer bar frame splines.

## Pre-Flight Checks

1. Walk around: inspect bubble canopy, rotor blades (wooden on early models; metal on G-2+), tail rotor, skids, tailboom.
2. Check oil level, hydraulic fluid (if fitted), fuel quantity.
3. Check CG — the Bell 47 has a narrow 5.5-inch CG envelope.
4. Collective full down, cyclic neutral, pedals centered, throttle closed.
5. Cold start: 3–4 primes. Hot start: no prime. Below-zero: special cold-weather procedure.
6. After start: freewheeling clutch check at 1,500 engine RPM — close throttle, rotor must continue spinning freely.
7. Warm up. Confirm rotor RPM in green arc (322–370) before attempting takeoff.

## Hover

The Bell 47 hover is notoriously sensitive — described as "standing atop a greased beach ball."
Hovering is learned last, after in-flight control familiarization.

1. Head into wind. Collective full down. Throttle to near max RPM (370).
2. Raise collective slowly while simultaneously twisting throttle outboard to maintain RPM as blade pitch increases drag.
3. As helicopter becomes light on skids, add left pedal to counteract torque.
4. Small cyclic corrections to maintain level attitude.
5. Continue raising collective until skids clear. Stay in green arc.
6. Stabilize at 3–5 ft AGL with small, coordinated, continuous inputs on all four controls.

## Normal Takeoff

1. Establish stable hover at 3–5 ft AGL into wind.
2. Small forward cyclic to begin forward movement.
3. Increase collective slightly (and throttle to match) to maintain altitude.
4. As airspeed builds through ETL (~16–24 kt), the helicopter surges — take advantage of it.
5. Climb at ~40–50 mph.

## Approach and Landing

1. Approach at ~10° descent angle, 60–70 kt.
2. Lower collective; adjust throttle for correct RPM.
3. Coordinate cyclic for airspeed; pedals maintain heading.
4. Gradually slow as altitude decreases.
5. Transition to hover at 10–15 ft AGL.
6. Lower collective smoothly to touch down.

**Running landing:** When insufficient power to hover (high density altitude or heavy load).
Approach low, slow to safe taxi speed, roll on skids. Requires clear, level surface.

## Emergency: Engine Failure / Autorotation

1. **Lower collective IMMEDIATELY to full down.** The single most critical action. Failure to do so causes rapid RPM decay below the recoverable minimum (322 RPM).
2. The freewheeling clutch auto-disconnects the engine; the rotor continues spinning, driven by upward airflow.
3. Add right pedal (torque is gone; uncorrected, nose yaws left).
4. Establish ~60 kt autorotation airspeed.
5. Reduce throttle to confirm needle split on tachometer.
6. Select landing site. The high-inertia rotor gives more time than low-inertia types.
7. Flare at ~50 ft AGL. Level at ~15 ft. Cushion with collective at ~10 ft.

**Engine failure from hover:** Apply right pedal, level attitude, use collective to cushion.
Time measured in seconds — no opportunity to establish autorotation airspeed.

## Emergency: Tail Rotor Failure in Forward Flight

1. Enter autorotation to eliminate torque.
2. Maintain 50+ kt to use vertical fin for partial yaw control.
3. Autorotative or running touchdown.

## Emergency: Tail Rotor Failure in Hover

1. Roll throttle off immediately.
2. Hovering autorotation — descend straight down.

## Emergency: Vortex Ring State (Settling with Power)

**Trigger:** Descending into own rotor wash at >300 ft/min sink rate, low airspeed, moderate power.
**Recovery:** Lower collective, lower nose, establish forward flight. Do NOT add power.
**Prevention:** Never exceed 300 ft/min sink rate below ETL airspeed unless in autorotation.

## Bell 47 Key Numbers

| Parameter | Value |
|-----------|-------|
| Max rotor RPM | **370** |
| Min rotor RPM (powered) | **322** |
| VNE | **91 kt / 105 mph** |
| Max cruise | **73 kt / 84 mph** |
| Best autorotation speed | **60 kt** |
| Tail rotor loss approach speed | **35 kt** |
| ETL speed | **~16–24 kt** |
| Max vortex-ring-safe descent | **<300 ft/min** at low airspeed |
| Max gross weight | **2,950 lb / 1,340 kg** |
| Fuel consumption | **~14–16 US gal/hr** |
| Service ceiling | **~10,500–11,000 ft** |
| Rate of climb | **860–1,100 ft/min** |
| Engine reduction ratio | **9:1** |

## Notable History

- First certified civilian helicopter (8 March 1946)
- Korean War medevac: transported ~18,000 of the war's 23,000 total casualties; reduced battlefield death rate from 4.5% (WWII) to 2.5%
- M*A*S*H TV series (1972–1983): featured in opening credits of all 251+ episodes
- First U.S. presidential helicopter: President Eisenhower, 12 July 1957
- First TV news helicopter: KTLA Telecopter, Los Angeles, 4 July 1958
- Apollo astronaut training: NASA used Bell 47s to simulate Lunar Module descent autorotation sink rates
- Total production: ~5,600–6,400 worldwide; built 1946–1974

---

## Notes on The Matrix

The helicopter used in The Matrix was a real Bell 212 flown in Sydney, Australia. Second unit
director Bruce Hunt got in trouble for buzzing it past the Attorney-General's Department building
on a weekend. In a continuity error, Tank's loading screen shows a B-206 image while the text
reads "B-212."

The short film accompanying this skill depicts a Bell 47 — chosen for its 1950s aesthetic and
iconic bubble canopy — reframing the Matrix scene in a Wes Anderson / American Southwest visual style.

For full technical specifications, see:
- `references/bell-212-specs.md`
- `references/bell-47-specs.md`
