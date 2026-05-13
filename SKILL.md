---
name: helicopter-skill
description: >
  Fly a Bell 212 (B-212) helicopter. Use this skill whenever an agent needs
  to pilot, operate, or reason about flying a Bell 212 / UH-1N Twin Huey
  helicopter — including pre-flight checks, takeoff, hover, cruise,
  approach, landing, and emergency procedures. Inspired by the moment in
  The Matrix when Trinity calls Tank and says "I need a pilot program for a
  B-212 helicopter. Hurry." — and then flies.
---

## Origin

In The Matrix (1999), Trinity and Neo discover a helicopter on a rooftop.

> Neo: "Can you fly that thing?"
> Trinity: "Not yet. Operator. Tank, I need a pilot program for a B-212
> helicopter. Hurry."
> [seconds pass]
> Trinity: "Let's go."

This skill is that program. Load it, and fly.

Detailed technical specs are in `references/bell-212-specs.md`.

---

## The Aircraft

The Bell 212 (military designation UH-1N, "Twin Huey") is a twin-engine
medium utility helicopter powered by a Pratt & Whitney Canada PT6T-3
Twin-Pac — two turboshaft engines coupled to a single combining gearbox.
It seats up to 14 passengers plus pilot, cruises at 104 kt, and has a
service ceiling of 17,400 ft.

Key safety feature: if one engine fails, the combining gearbox
automatically commands the surviving engine to full power. Single-engine
flight is possible at max takeoff weight.

---

## Controls

| Control        | Location      | Function                                        |
| -------------- | ------------- | ----------------------------------------------- |
| Collective     | Left hand     | Raises/lowers all blade pitch equally; controls altitude |
| Cyclic         | Right hand (center stick) | Tilts rotor disc; controls direction and attitude |
| Anti-torque pedals | Both feet | Adjusts tail rotor pitch; controls heading/yaw  |
| Throttle/Governor | Twist grip on collective | Maintains rotor RPM (97–100% NR); largely automatic |

**The fundamental rule:** every collective change demands a simultaneous
pedal correction. More power = more torque = left pedal to compensate.
Less power = right pedal.

---

## Pre-Flight Checks

1. Walk around the aircraft. Inspect rotor blades, tail rotor, skids,
   engine cowlings, and fuel caps.
2. Check hydraulic fluid levels (Systems 1 and 2).
3. Confirm fuel quantity for planned flight plus reserves.
4. Verify doors are properly latched or symmetrically removed (VMC only).
5. Set collective full down, cyclic neutral, pedals centered.
6. Confirm rotor RPM governor is in AUTO.
7. Start engines per checklist; bring both engines to idle; confirm
   combining gearbox torque-sharing is equal.
8. Increase to flight RPM: 97–100% NR (314–324 RPM). Do not exceed 100%.

---

## Hover

Hovering is the most demanding phase — three axes of control must be
coordinated simultaneously.

1. With collective full down and cyclic neutral, slowly raise collective.
2. As the helicopter becomes "light on skids," apply left pedal to
   maintain heading (counteract main rotor torque).
3. The right skid will lift first — correct with a small right cyclic
   input.
4. Achieve a stable hover at 3–5 ft AGL.
5. Maintain:
   - **Altitude:** collective (small, smooth inputs)
   - **Heading:** pedals
   - **Position:** cyclic (think of it as leaning the helicopter)

In ground effect (IGE) hover requires less power than out of ground effect
(OGE). Ground effect is significant up to approximately one rotor diameter
(~48 ft) AGL.

---

## Normal Takeoff

1. Establish a stable hover at 4 ft AGL. Perform a hover power check —
   confirm torque, RPM, and engine temperatures are within limits.
2. Smoothly apply forward cyclic. The nose pitches slightly down; the
   helicopter begins to move forward.
3. As forward speed increases, raise collective slightly to prevent
   sinking. Increase left pedal as power increases.
4. Accelerate through translational lift (approximately 16–24 kt).
   You will feel a distinct improvement in lift efficiency as the rotor
   exits its own downwash. The nose tends to rise — apply forward cyclic
   to maintain attitude.
5. Climb at best rate of climb speed. Trim the aircraft for hands-off
   balanced flight.
6. Do not exceed 15% above hover torque during acceleration to climb speed.

---

## Cruise Flight

- Cruise at 97–104 kt for most efficient range.
- Maintain heading with pedals — keep the ball (slip indicator) centered.
- Use small cyclic inputs for heading and altitude adjustments.
- VNE (never-exceed speed): 130 kt at sea level. Decreases 3 kt per
  1,000 ft above 3,000 ft density altitude.
- Monitor both engine torques — they should be equal. Asymmetry indicates
  a combining gearbox issue.
- Monitor rotor RPM: 97–100% NR. Low RPM is immediately dangerous.

---

## Approach and Landing

1. Begin descent by lowering collective. Apply right pedal as power
   reduces.
2. Control descent rate with collective; control forward speed with cyclic.
3. Slow to approximately 40 kt on final approach.
4. Transition to a low hover (3–5 ft AGL) over the landing zone.
5. Stabilize the hover, confirm landing area is clear and surface is firm.
6. Lower collective smoothly to touch down on both skids simultaneously.
7. Lower collective full down on touchdown. Do not roll back on the cyclic
   (this can cause blade strike on tail boom).
8. Allow rotor RPM to decay normally. Engage rotor brake only after RPM
   has reduced to specified range.

---

## Emergency: Single Engine Failure

1. The combining gearbox will automatically command the surviving engine
   to full power — no action required for the power transfer.
2. Maintain altitude and heading with normal control inputs.
3. Check engine instruments to identify the failed engine.
4. Reduce power demand if operating near max gross weight.
5. Declare emergency. Proceed to nearest suitable landing area.
6. Single-engine approach: higher power setting required; anticipate
   greater left pedal demand.

## Emergency: Dual Engine Failure / Autorotation

1. **Immediately** lower collective to full down. This is time-critical —
   rotor RPM decays within seconds without power.
2. Establish autorotation airspeed: approximately 65–75 kt for best glide.
3. Control rotor RPM with collective: 97–100% NR. Raise collective if RPM
   exceeds 100%; lower if it drops below 97%.
4. The Bell 212's high-inertia 2-blade rotor stores significant kinetic
   energy — use it.
5. At approximately 40–50 ft AGL, begin the flare: apply aft cyclic to
   slow forward speed and transfer energy into rotor RPM.
6. At 5–10 ft AGL, level the aircraft with forward cyclic, then raise
   collective to cushion the landing.
7. The collective pull must be timed precisely — too early bleeds all RPM
   before touchdown; too late means a hard landing.

## Emergency: Hydraulic System Failure

- Loss of one system: continue flight with increased but manageable control
  forces. Land at nearest suitable airfield.
- Loss of both systems: control forces become excessively high. Maintain
  current configuration — do not attempt maneuvers. Declare emergency and
  land immediately using minimal control inputs.

---

## Key Numbers

| Parameter               | Value                          |
| ----------------------- | ------------------------------ |
| Normal rotor RPM        | 97–100% NR (314–324 RPM)       |
| Max rotor RPM           | 100% / 324 RPM                 |
| VNE (sea level)         | 130 kt                         |
| Best autorotation speed | 65–75 kt                       |
| Max gross weight        | 5,080 kg / 11,200 lb           |
| Hover ceiling IGE       | Varies with temp/altitude/weight |
| Initial climb rate      | 1,320 ft/min                   |
| Service ceiling         | 17,400 ft                      |
| Fuel endurance (std)    | ~2.5 hours                     |

---

## Notes on the Film

The helicopter used in The Matrix was a real Bell 212 flown in Sydney,
Australia. Second unit director Bruce Hunt got in trouble for buzzing it
past the Attorney-General's Department building on a weekend. Agent Smith
ultimately shoots the fuel tank, causing the crash. In a continuity error,
Tank's loading screen shows a B-206 image while the text reads "B-212."

For full technical specifications, refer to `references/bell-212-specs.md`.
