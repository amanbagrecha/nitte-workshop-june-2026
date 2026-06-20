# Part 0 — Setup (do this first!)

> ⏰ **Instructors / students: read this before the workshop day.**
> Earth Engine access needs a Google account **and** a registered Cloud project.
> Approval is usually quick but can take up to a day, so don't leave it to the morning of the workshop.

---

## Section 0.1 — Get Earth Engine access

1. You need a **Google account** (any Gmail works).
2. Go to 👉 **<https://code.earthengine.google.com/register>**
3. Choose **"Use Earth Engine for non-commercial / academic"** (it's free for students and research).
4. When asked for a Cloud project, let it **create a new project** for you (e.g. `ee-yourname`).
   Accept the default — you do *not* need to enable billing for non-commercial use.
5. Wait for the confirmation, then open 👉 **<https://code.earthengine.google.com>**

If you see a map and an empty code panel, you're in. 🎉

> 🛟 **Stuck on approval?** Pair up — one approved laptop per group is enough to
> get started. You can all look at the same screen and still each learn.

---

## Section 0.2 — Tour of the Code Editor

When you open the Code Editor you'll see **four areas**:

```
┌─────────────┬───────────────────────────┬───────────────┐
│  Scripts    │   Code editor (you type    │  Console      │
│  Docs       │   JavaScript here)         │  Inspector    │
│  Assets     │                            │  Tasks        │
│  (left)     │   [ Run ]  [ Save ]        │  (right)      │
├─────────────┴───────────────────────────┴───────────────┤
│                     MAP  (results appear here)           │
└──────────────────────────────────────────────────────────┘
```

| Panel | What it's for |
|-------|---------------|
| **Code editor** (centre) | Where you write and **Run** your script. |
| **Map** (bottom) | Where layers you add with `Map.addLayer(...)` show up. |
| **Console** (right) | Where `print(...)` output appears. Your window into what an object *is*. |
| **Inspector** (right) | Click it, then click the map to read pixel values at that spot. |
| **Tasks** (right) | Where **Export** jobs (e.g. download a GeoTIFF) run. |
| **Scripts** (left) | Your saved scripts. **Save often.** |
| **Docs** (left) | Searchable reference for every function (`ee.Image`, `Map.addLayer`, ...). |

---

## Section 0.3 — Your very first script

Paste this into the centre panel and press **Run**:

```js
print('Hello Earth Engine!');

var point = ee.Geometry.Point([74.856, 12.914]);  // Mangaluru [longitude, latitude]
Map.centerObject(point, 12);
Map.addLayer(point, {color: 'red'}, 'Mangaluru');
```

You should see:
- `Hello Earth Engine!` in the **Console** (right), and
- the map jump to **Mangaluru** with a red dot.

> ⚠️ **Coordinates are `[longitude, latitude]` — longitude first!**
> This trips up *everyone* at least once. Karnataka is around longitude **74–77**, latitude **12–15**.

---

## Section 0.4 — Saving & sharing

- **Save:** click **Save** (or `Ctrl/Cmd + S`). Give it a name. It lives under **Scripts** on the left.
- **Share a script:** click **Get Link** (top bar). Anyone with the link sees your exact code.
- **Publish an app:** the **Apps** button (top-right) turns a script into a public web page. We'll do this in the live demo.

---

## ✅ You're ready when…

- [ ] You can open the Code Editor and see the map.
- [ ] You ran the "Hello" script and the map moved to Mangaluru.
- [ ] You know where the **Console**, **Inspector**, and **Tasks** tabs are.

Next up → [Part 1: Morning Basics](../01-basics/)
