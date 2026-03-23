# Design System Strategy: The Zero-G Interface

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Weightless Intelligence."** 

Standard email clients are cluttered, heavy, and anxiety-inducing. This system moves in the opposite direction, utilizing intentional asymmetry, expansive breathing room, and a "floating" architectural philosophy. We break the traditional "admin dashboard" template by treating the inbox not as a list of chores, but as a curated gallery of priorities. 

By utilizing high-contrast typography scales (Manrope for expression, Inter for utility) and deep tonal layering, we create a high-end editorial experience that feels premium and high-tech. Elements should never feel "pinned" to a grid; they should feel suspended in a calm, digital vacuum.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the depth of `surface` (#0b1326), using light not as a border, but as a volume.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Traditional dividers are a sign of "template" thinking. Instead:
- **Tonal Shifts:** Separate the navigation from the feed by shifting from `surface` to `surface-container-low`.
- **Negative Space:** Use the Spacing Scale (specifically `8` to `12`) to create mental boundaries without visual clutter.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
1. **Base Layer:** `surface-dim` or `surface`.
2. **Structural Sections:** `surface-container-low`.
3. **Interactive Cards:** `surface-container` or `surface-container-high`.
4. **Active/Focused Elements:** `surface-bright`.

### The "Glass & Gradient" Rule
To capture the "futuristic" requirement, use Glassmorphism for floating overlays (Modals, Command Palettes). 
- **Recipe:** `surface-container` at 60% opacity + 20px Backdrop Blur.
- **Signature Glow:** Main CTAs must use a linear gradient from `primary` (#d0bcff) to `secondary_container` (#0566d9). This provides a "visual soul" that flat colors cannot replicate.

---

## 3. Typography: Editorial Authority
We use a dual-typeface system to balance high-tech precision with human-centric calm.

*   **Display & Headlines (Manrope):** Used for large-scale data, welcome strings, and section headers. The wide apertures of Manrope feel "open" and futuristic.
*   **Body & Labels (Inter):** Used for the actual content of emails and functional UI labels. Inter’s x-height ensures readability even at `body-sm`.

**The Scale Logic:** 
We use an aggressive contrast between `display-lg` (3.5rem) and `body-md` (0.875rem). This creates an editorial rhythm, making the "Anti-Gravity" experience feel like a premium digital magazine rather than a spreadsheet.

---

## 4. Elevation & Depth: Tonal Layering
In a weightless UI, "shadows" are actually "ambient occlusions."

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-highest` card sitting on a `surface` background provides all the "lift" necessary.
*   **Ambient Shadows:** For floating elements (like a drafted email), use an ultra-diffused shadow: `offset-y: 24px, blur: 48px, color: rgba(0, 0, 0, 0.4)`. 
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in high-glare environments), use `outline-variant` at 15% opacity. Never use 100% opaque lines.
*   **Active States:** Active cards should not just change color; they should emit a subtle outer glow using the `primary` token at 20% opacity with a 15px blur.

---

## 5. Components

### Buttons
*   **Primary:** Gradient background (`primary` to `secondary_container`), `on_primary` text. Radius: `full`.
*   **Secondary:** `surface-container-highest` background. No border. Soft `primary` glow on hover.
*   **Tertiary:** Ghost style. No background. Understated `on_surface_variant` text.

### Cards & Inbox Items
*   **Constraint:** Forbid divider lines between emails. 
*   **Implementation:** Use a `surface-container-low` background for the "Read" state and `surface-container-high` for "Unread." 
*   **Corner Radius:** Always use `lg` (2rem) for main containers and `DEFAULT` (1rem) for nested elements.

### AI Intelligence Chips
*   **Visuals:** Use a subtle `tertiary_container` fill. These should feel distinct from standard tags, acting as "smart" indicators.
*   **Motion:** When AI is "thinking," the chip should have a pulsing gradient border using the `outline` token.

### Input Fields
*   **Style:** Minimalist. No bottom line or box. Use a `surface-container-lowest` inset "well" with a `DEFAULT` (1rem) radius. 
*   **Focus:** Transition the background to `surface-container-high` and add a subtle `primary` shadow.

### Floating Action "Gravity" Hub
*   A custom component for this app: A centered, bottom-floating dock (Glassmorphic) that houses AI actions. It uses `xl` (3rem) rounding to feel like a pebble smoothed by water.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical padding (e.g., more padding on the left of a header than the right) to create a custom, "non-template" feel.
*   **Do** embrace the dark. Use `surface-dim` for 90% of the UI to reduce eye strain and emphasize the "calm" personality.
*   **Do** use `primary-fixed` for high-priority AI notifications to ensure they "pop" against the charcoal depths.

### Don't:
*   **Don't** use pure #000000 black. It kills the depth. Use the `background` token (#0b1326).
*   **Don't** use standard 4px or 8px corners. If it’s not `16px+`, it’s not part of this system. Small radii feel "legacy."
*   **Don't** crowd the interface. If a screen feels "busy," increase the spacing scale from `4` to `6` or `8`. Space is a luxury; use it.