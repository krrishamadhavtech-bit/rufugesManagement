#!/bin/bash

# Define replacements
declare -A replacements
replacements["#f8fafc"]="var(--bg-light)"
replacements["#001e3c"]="var(--secondary)"
replacements["#6b7a8c"]="var(--text-light)"
replacements["#edf2f7"]="var(--border-soft)"
replacements["#38a9a3"]="var(--primary)"
replacements["#b86f7a"]="var(--danger)"
replacements["#4b6a7c"]="var(--text-secondary)"
replacements["#e2e8f0"]="var(--border-gray)"
replacements["#2c8a85"]="var(--primary-dark)"
replacements["#2e7d32"]="var(--success-bold)"
replacements["#1b5e20"]="var(--success-bold-dark)"
replacements["#eef2f6"]="var(--bg-map)"
replacements["#517ea8"]="var(--info)"
replacements["#e3f2fd"]="var(--bg-info-light)"
replacements["#fef2f2"]="var(--bg-danger-light)"
replacements["#94a3b8"]="var(--text-muted)"
replacements["#e8f1f0"]="var(--bg-primary-soft)"
replacements["#f5fafc"]="var(--bg-primary-hover)"
replacements["#1a0dab"]="var(--text-link)"
replacements["#006621"]="var(--text-success-link)"
replacements["#545454"]="var(--text-gray-dark)"
replacements["#f9fbfd"]="var(--bg-soft)"
replacements["#64748b"]="var(--text-dim)"
replacements["#dc3545"]="var(--danger-bold)"
replacements["#ddd"]="var(--border-base)"
replacements["#e8f6f5"]="var(--bg-primary-soft)" # Close enough 
replacements["rgba(0, 0, 0, 0.5)"]="var(--bg-modal-overlay)"
replacements["rgba(56, 169, 163, 0.1)"]="var(--primary-light)"
replacements["rgba(255, 255, 255, 0.15)"]="var(--bg-glass)"
replacements["rgba(255, 255, 255, 0.25)"]="var(--border-white-glass)"
replacements["rgba(255, 255, 255, 0.3)"]="var(--bg-glass-heavy)"
replacements["rgba(255, 255, 255, 0.1)"]="var(--bg-glass-light)"
replacements["rgba(255, 255, 255, 0.2)"]="var(--border-white-glass-light)"
replacements["rgba(255, 255, 255, 0.7)"]="var(--text-white-muted)"
replacements["rgba(255, 255, 255, 0.6)"]="var(--text-white-dim)"
replacements["rgba(255, 255, 255, 0.4)"]="var(--text-white-extra-dim)"
replacements["rgba(255, 255, 255, 0.45)"]="var(--text-white-extra-dim)" # Close enough
replacements["rgba(255, 255, 255, 0.9)"]="rgba(255, 255, 255, 0.9)" # Will handle later if needed
replacements["rgba(0, 30, 60, 0.55)"]="var(--bg-overlay)"

# Named colors (be careful with these)
# Only replace if they are used as whole words in CSS-like contexts
# Skipping for now to avoid breaking things, will use targeted replacements for white/black/etc.

FILES=$(find src -type f \( -name "*.css" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.js" \) ! -name "Colors.css")

for file in $FILES; do
    echo "Processing $file..."
    for color in "${!replacements[@]}"; do
        sed -i '' "s|$color|${replacements[$color]}|g" "$file"
    done
done
