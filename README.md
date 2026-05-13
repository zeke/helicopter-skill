# helicopter-skill

An agent skill for flying a Bell 212 (B-212) helicopter.

> "Tank, I need a pilot program for a B-212 helicopter. Hurry."
> — Trinity, The Matrix (1999)

This is that program. Install it, and any agent that loads this skill will
know how to fly a Bell 212 / UH-1N Twin Huey helicopter: pre-flight checks,
hover, takeoff, cruise, approach, landing, single-engine failure,
autorotation, and hydraulic emergencies.

## Install

```bash
npx skills add zeke/helicopter-skill
```

Or install globally so it's available across all your projects:

```bash
npx skills add zeke/helicopter-skill -g
```

## What's inside

```
helicopter-skill/
├── SKILL.md                   # Main skill: controls, procedures, emergencies
└── references/
    └── bell-212-specs.md      # Full technical specs (loaded on demand)
```

The skill follows the [Agent Skills specification](https://github.com/agentskills/agentskills)
and works with OpenCode, Claude Code, Cursor, Codex, and 40+ other agents.

## The scene

The clip that inspired this skill was transcribed using
[openai/whisper](https://replicate.com/openai/whisper) (large-v3) on
Replicate. The model got it right on the first pass:

```
00:00:00 --> 00:00:04   Can you fly that thing?
00:00:06 --> 00:00:07   Not yet.
00:00:11 --> 00:00:11   Operator.
00:00:11 --> 00:00:14   Tank, I need a pilot program for a B-212 helicopter.
00:00:14 --> 00:00:16   Hurry.
00:00:21 --> 00:00:25   Let's go.
```

## The aircraft

The Bell 212 (UH-1N "Twin Huey") is a twin-engine medium utility
helicopter. Key facts:

- Engine: Pratt & Whitney Canada PT6T-3 Twin-Pac (two coupled turboshafts)
- Max speed: 130 kt / 240 km/h
- Service ceiling: 17,400 ft / 5,300 m
- Capacity: 14 passengers + pilot
- The real one used in filming was shot in Sydney, Australia

The helicopter in the film is sometimes called a "UH-1" or "Huey" — the
Bell 212 is a twin-engine development of the original UH-1 Iroquois. In a
continuity error, Tank's loading screen shows a B-206 image while the text
reads "B-212."

## License

MIT
