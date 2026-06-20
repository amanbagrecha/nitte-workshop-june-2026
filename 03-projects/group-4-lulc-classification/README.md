# Group 4 — Land Use / Land Cover

Teach the computer to label every pixel as **water, vegetation, built-up, or bare**.
You give examples, a machine-learning classifier learns the pattern, and paints the
whole map. This is the workhorse of remote sensing.

[reference sheet](reference.md) · [`starter.js`](starter.js)

---

## The deliverable

1. A **4-class LULC map** of the Mangaluru–Udupi belt that actually looks right.
2. **One number**: either an **accuracy** figure (%) or the **built-up area** (km²).
3. A **shareable output** — Get Link, App, or GeoTIFF.

---

## Run the starter

Paste [`starter.js`](starter.js) and Run. You'll get a classified map — and it will
look **bad**. That's intentional: it learned from only ~7 points. The whole project
is making it good with *better training data*.

---

## Your tasks

1. **Collect real training data.** Use the map's **geometry tools** (top-left) to draw
   many points/polygons per class. Aim for 20–50 examples *per class*, spread out.
2. **Retrain & inspect.** Feed your samples back in. Does water stop being confused
   with shadow? Add examples where it's wrong.
3. **Measure accuracy.** Split your samples into *train* and *test*; build a
   **confusion matrix** and report overall accuracy.
4. **Get a number that matters.** Mask the built-up class and measure its area in km².
5. **Ship it** — export the classified GeoTIFF, or an app.

---

## Hints (not the code)

- Draw training data: click a class colour in the **Imports** geometry tools, drop
  points on obvious examples, repeat per class. Import them as a `FeatureCollection`.
- More **bands = more signal**: the starter uses B2,B3,B4,B8,B11,B12 — adding **NDVI**
  and **NDWI** as extra bands often boosts accuracy.
- Train/test split: add a random column with `randomColumn()` then `filter` on it.
- Accuracy: `classifier.confusionMatrix()` (training) or
  `testSample.classify(classifier).errorMatrix('lc', 'classification')` (honest test).
- Sanity check against truth: ESA **WorldCover** (`ESA/WorldCover/v200`) — does your
  map roughly agree?

---

## Ask the AI well

> "In the GEE **JavaScript** Code Editor I have a Sentinel-2 image and a
> `FeatureCollection` of training points with a class property `lc`. Show me only the
> lines to split into train/test with `randomColumn`, train `smileRandomForest`, and
> print an `errorMatrix` accuracy. Don't rewrite my script."

**Verify:** does the AI use *your* property name (`lc`) and *your* band list? A
classifier silently trains on whatever bands you pass — check them. Then eyeball the
result against true colour.

---

## Stretch goals

- Add a 5th/6th class (e.g. cropland vs forest, wetland).
- Compare classifiers: `smileRandomForest` vs `smileCart` vs `smileGradientTreeBoost`.
- Two-date change: classify 2016 and 2024, map where built-up replaced vegetation.

---

## Watch out for

- **Garbage in, garbage out** — bad/few training points = bad map. This is 80% of the work.
- Training accuracy *lies* (it grades itself); only a held-out **test set** is honest.
- Don't sample training points over clouds.
