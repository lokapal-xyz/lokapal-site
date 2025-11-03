/**
 * HNP-1 (Hashed Normalization Protocol - Version 1)
 * Client-side implementation for content hash verification
 * 
 * Strict normalization rules for chapter-style text:
 * 1. Read file as UTF-8
 * 2. Normalize Unicode to NFC form (composed form)
 * 3. Convert all line endings to LF (\n)
 * 4. Remove all trailing whitespace from each line
 * 5. Standardize blank lines (max 2 consecutive blank lines becomes 1)
 * 6. Remove leading whitespace from beginning of file
 * 7. Remove trailing whitespace from end of file
 * 8. Normalize all tabs to 4 spaces
 * 9. Strip BOM if present
 * 10. Ensure file ends with single newline
 */

/**
 * Normalize text according to HNP-1 protocol
 */
function normalizeText(content: string): string {
  // Step 1: Remove BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  // Step 2: Normalize Unicode to NFC (composed form)
  content = content.normalize('NFC');

  // Step 3: Convert all line endings to LF (\n)
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Step 4: Split into lines and process each
  let lines = content.split('\n');

  // Step 5: Remove trailing whitespace from each line
  lines = lines.map(line => line.replace(/\s+$/, ''));

  // Step 6: Normalize tabs to 4 spaces
  lines = lines.map(line => line.replace(/\t/g, '    '));

  // Step 7: Remove leading blank lines
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  // Step 8: Remove trailing blank lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  // Step 9: Collapse multiple consecutive blank lines (max 1 blank line between content)
  const normalizedLines: string[] = [];
  let lastWasBlank = false;

  for (const line of lines) {
    const isBlank = line.trim() === '';

    if (isBlank) {
      if (!lastWasBlank) {
        normalizedLines.push(line);
        lastWasBlank = true;
      }
      // Skip if previous line was also blank
    } else {
      normalizedLines.push(line);
      lastWasBlank = false;
    }
  }

  // Step 10: Join lines and ensure single trailing newline
  let normalized = normalizedLines.join('\n');

  // Ensure exactly one trailing newline
  normalized = normalized.replace(/\n*$/, '\n');

  return normalized;
}

/**
 * Compute SHA-256 hash of normalized content using HNP-1 protocol
 */
export async function computeHNP1Hash(file: File): Promise<string> {
  // Read file as text
  const text = await file.text();
  
  // Normalize according to HNP-1
  const normalized = normalizeText(text);
  
  // Convert to UTF-8 bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  
  // Compute SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Return with 0x prefix (Solidity bytes32 format)
  return `0x${hashHex}`;
}