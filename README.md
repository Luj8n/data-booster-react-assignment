## Development

Run the dev server:

```bash
npm run dev
```

## Aproach

- Looked at `lessons.json` and mostly understood the structure of the whole project
- Created the routes
- Tried to implement the exercise page using the Figma design one component at a time
- Refactored the code a little bit
- Moved the icons to their own folder
- Made it more mobile friendly by changing CSS

## Things that could be improved with more time

- Change some HTML tags from `div` to others (like `section`, `article`, etc.)
- Specify the color palette in the tailwind config and use that instead of random hex colors
- Finalize the spacing between elements
- Handle lesson and exercise types better (something like a union type)
- Display a modal (instead of an alert) when the hint button is pressed
- Possibly split up the Exercise component into more components

## Things that would need some discussion

- Raw HTML in an exercise's description and the hint. Can the data (`lessons.json`) be trusted? Also how should images be handled?
- Why does the last exercise lead to a non existant exercise?
- How should `is_completed` be displayed?
- Can you skip questions?
- What about other lessons? And what are chapters?
- Can there be more exercise types than multiple choice questions and videos?
