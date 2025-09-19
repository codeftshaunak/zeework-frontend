#!/bin/bash

# Convert migration helpers to pure Tailwind classes
echo "🎨 Converting to pure Tailwind CSS..."

# Find all files that use migration helpers
files_with_helpers=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*migration-helpers")

for file in $files_with_helpers; do
    echo "⚡ Converting to Tailwind: $file"

    # Replace migration helper imports with pure Tailwind
    sed -i '' 's|import.*from.*migration-helpers.*||g' "$file"

    # Add React import if not present
    if ! grep -q "import React" "$file"; then
        sed -i '' '1i\
import React from "react";
' "$file"
    fi

    # Replace VStack with Tailwind flex column
    sed -i '' 's|<VStack|<div className="flex flex-col|g' "$file"
    sed -i '' 's|</VStack>|</div>|g' "$file"

    # Replace HStack with Tailwind flex row
    sed -i '' 's|<HStack|<div className="flex flex-row items-center|g' "$file"
    sed -i '' 's|</HStack>|</div>|g' "$file"

    # Replace Box with div
    sed -i '' 's|<Box|<div|g' "$file"
    sed -i '' 's|</Box>|</div>|g' "$file"

    # Replace Text with span
    sed -i '' 's|<Text|<span|g' "$file"
    sed -i '' 's|</Text>|</span>|g' "$file"

    # Replace Stack with div flex
    sed -i '' 's|<Stack|<div className="flex|g' "$file"
    sed -i '' 's|</Stack>|</div>|g' "$file"

    # Replace Flex with div flex
    sed -i '' 's|<Flex|<div className="flex|g' "$file"
    sed -i '' 's|</Flex>|</div>|g' "$file"

    # Replace Center with div flex center
    sed -i '' 's|<Center|<div className="flex items-center justify-center|g' "$file"
    sed -i '' 's|</Center>|</div>|g' "$file"

    # Replace Input with native input
    sed -i '' 's|<Input|<input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"|g' "$file"

    # Replace Button with native button
    sed -i '' 's|<Button|<button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"|g' "$file"

    # Clean up duplicate className attributes
    sed -i '' 's|className="[^"]*" className=|className=|g' "$file"

    echo "✅ Converted: $file"
done

echo "🎉 Tailwind conversion complete!"