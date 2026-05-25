# AETHER: The Ghost Protocol - Official Hints & Answers Guide

This document contains a comprehensive breakdown of all 25 levels in the AETHER system, including their titles, descriptions, hints, and expected answers.

---

### Level 1: Initialization
*   **Title**: Initialization
*   **Description**: AETHER detects new operators... Find the fragmented key.
*   **Answer**: `ghost`
*   **Hints**:
    1. Inspect the page source (Right-click -> View Page Source).
    2. The answer is inside an HTML comment: `<!-- first_fragment: ghost -->`

---

### Level 2: Obfuscation
*   **Title**: Obfuscation
*   **Description**: Can you see what is hidden in plain sight?
*   **Answer**: `cipher`
*   **Hints**:
    1. Look closely at the glitches (e.g., in the header status bar).
    2. CSS pseudoclass content sometimes holds secrets (inspect `.glitch::after`).

---

### Level 3: Persistence
*   **Title**: Persistence
*   **Description**: The network fragments memory. Some things are preserved only on your local machine.
*   **Answer**: `void`
*   **Hints**:
    1. Check your browser's application memory (F12 -> Application/Storage tab).
    2. Look under the Local Storage section for key `aether_directive`.

---

### Level 4: Volatility
*   **Title**: Volatility
*   **Description**: Temporary fragments are stored as cookies.
*   **Answer**: `cookie`
*   **Hints**:
    1. Cookies aren't just for eating.
    2. Check your browser's active cookies (e.g., document.cookie in the console) for `aether_secret`.

---

### Level 5: Transmission
*   **Title**: Transmission
*   **Description**: Open the system's interactive console to receive the direct frequency.
*   **Answer**: `terminal`
*   **Hints**:
    1. Inspect the browser's developer console (F12 or Ctrl+Shift+I).
    2. AETHER logs its transmission directly to the console output.

---

### Level 6: Encapsulation
*   **Title**: Encapsulation
*   **Description**: Components hide properties within themselves. Find the element housing the terminal and inspect its DOM attributes.
*   **Answer**: `attribute`
*   **Hints**:
    1. Inspect the DOM tree in the Elements tab.
    2. Look at the attributes of the `<main id="terminal">` element for `data-secret`.

---

### Level 7: Encoding
*   **Title**: Encoding
*   **Description**: Translate this secure broadcast: `ZGVjb2Rl`
*   **Answer**: `decode`
*   **Hints**:
    1. The string is encoded in Base64 format.
    2. Use a Base64 decoder online or execute `atob("ZGVjb2Rl")` in the console.

---

### Level 8: Rotation
*   **Title**: Rotation
*   **Description**: The characters have been shifted by 13 positions: `zngevk`
*   **Answer**: `matrix`
*   **Hints**:
    1. This is a ROT13 cipher.
    2. Shift each letter 13 spaces forward/backward in the alphabet to decrypt.

---

### Level 9: Obscurity
*   **Title**: Obscurity
*   **Description**: Some elements exist in the system architecture but are rendered invisible.
*   **Answer**: `shadow`
*   **Hints**:
    1. Look for a hidden element added to the DOM.
    2. Check the body tag in the Elements tab for a div with ID `dynamic-clue` and styling `display: none`.

---

### Level 10: Runtime
*   **Title**: Runtime
*   **Description**: At runtime, memory address spaces can be queried.
*   **Answer**: `global`
*   **Hints**:
    1. Open the console and check the global window context.
    2. Type `window.aether_key` or simply `aether_key`.

---

### Level 11: Variables
*   **Title**: Variables
*   **Description**: Modern styling frameworks use custom root variables.
*   **Answer**: `nebula`
*   **Hints**:
    1. Look at the computed styles on the root element.
    2. Inspect the CSS custom properties of the `:root` selector for `--aether-secret`.

---

### Level 12: Volatility
*   **Title**: Volatility
*   **Description**: Session storage vanishes when the tab is closed. Check the current session record.
*   **Answer**: `session`
*   **Hints**:
    1. Open browser Application/Storage tab.
    2. Check the Session Storage values for this site for the key `aether_session_secret`.

---

### Level 13: Navigation
*   **Title**: Navigation
*   **Description**: The current location pointer has been updated. Look at the end of the location address.
*   **Answer**: `anchor`
*   **Hints**:
    1. Look at the URL in your browser's address bar.
    2. Check the hash or fragment identifier part of the URL (after the `#` symbol).

---

### Level 14: Binary
*   **Title**: Binary
*   **Description**: Decode: `01100010 01101001 01101110 01100001 01110010 01111001`
*   **Answer**: `binary`
*   **Hints**:
    1. Convert the binary string into ASCII text.
    2. Each 8-bit block represents a single character (e.g., `01100010` = `b`).

---

### Level 15: Hexadecimal
*   **Title**: Hexadecimal
*   **Description**: Decode: `68 65 78 61 64 65 63 69 6d 61 6c`
*   **Answer**: `hexadecimal`
*   **Hints**:
    1. Decode the hexadecimal bytes into text.
    2. Each pair of hex numbers represents a character (e.g., `68` = `h`).

---

### Level 16: Signal
*   **Title**: Signal
*   **Description**: Decode: `.- -. -.. .-. --- -- . -.. .-`
*   **Answer**: `andromeda`
*   **Hints**:
    1. Decode the Morse code sequence.
    2. Spaces separate individual letters.

---

### Level 17: Redirection
*   **Title**: Redirection
*   **Description**: An anchor has been dropped in the document's DOM hierarchy.
*   **Answer**: `portal`
*   **Hints**:
    1. Search for anchor tags (`<a>`) in the HTML document.
    2. Inspect the href attribute of the hidden link with ID `dynamic-clue`.

---

### Level 18: Reversal
*   **Title**: Reversal
*   **Description**: Invert this sequence to reveal the path: `egarem`
*   **Answer**: `mirage`
*   **Hints**:
    1. Simply read the word in reverse order.
    2. Write 'egarem' backwards.

---

### Level 19: Rearrangement
*   **Title**: Rearrangement
*   **Description**: Rearrange the characters of this word to reveal the target: `silent`
*   **Answer**: `listen`
*   **Hints**:
    1. Create an anagram of the word 'silent'.
    2. The word is related to paying attention audibly.

---

### Level 20: Sequence
*   **Title**: Sequence
*   **Description**: Predict the next value: `1, 1, 2, 3, 5, 8, 13, 21, 34, ?`
*   **Answer**: `55`
*   **Hints**:
    1. This is the Fibonacci sequence.
    2. Add the last two numbers together (21 + 34) to find the answer.

---

### Level 21: Identity
*   **Title**: Identity
*   **Description**: Check the CSS classes of the input prompt area.
*   **Answer**: `spectre`
*   **Hints**:
    1. Inspect the element with ID 'input-container' in the DOM.
    2. Look at the list of classes assigned to that section.

---

### Level 22: Diagnostics
*   **Title**: Diagnostics
*   **Description**: Review the alert diagnostics in the web inspector.
*   **Answer**: `warning`
*   **Hints**:
    1. Open the console log.
    2. Look specifically at the yellow console warning messages.

---

### Level 23: Execution
*   **Title**: Execution
*   **Description**: Execute the function hook registered on the global stack.
*   **Answer**: `resonance`
*   **Hints**:
    1. In the browser console, call the function: `getAetherKey()`
    2. Type `getAetherKey()` and press Enter.

---

### Level 24: Metadata
*   **Title**: Metadata
*   **Description**: Secrets are sometimes embedded directly in the document metadata.
*   **Answer**: `entropy`
*   **Hints**:
    1. Look at the metadata inside the `<head>` tags.
    2. Find the `<meta>` tag with the name 'aether-key' and read its content.

---

### Level 25: Containment
*   **Title**: Containment
*   **Description**: You have reached the end. There is no answer here. Only observation.
*   **Answer**: `this-is-impossible`
*   **Hints**:
    1. The puzzle is containment.
    2. There is no way out.
