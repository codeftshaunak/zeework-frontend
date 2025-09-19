#!/bin/bash

# Smart Chakra UI to Native HTML/Shadcn Migration Script
# This script automatically replaces Chakra UI imports and components

echo "🚀 Starting smart Chakra UI migration..."

# Find all files with Chakra UI
files_with_chakra=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "@chakra-ui")

echo "📁 Found $(echo "$files_with_chakra" | wc -l) files with Chakra UI"

# Process each file
for file in $files_with_chakra; do
    echo "⚡ Processing: $file"

    # Create backup
    cp "$file" "$file.bak"

    # Replace common Chakra imports with migration helpers
    sed -i '' 's|import { Box, VStack, HStack, Stack, Flex, Text, Center } from "@chakra-ui/react";|import { Box, VStack, HStack, Stack, Flex, Text, Center } from "@/components/ui/migration-helpers";|g' "$file"

    sed -i '' 's|import { Box, VStack, HStack, Text } from "@chakra-ui/react";|import { Box, VStack, HStack, Text } from "@/components/ui/migration-helpers";|g' "$file"

    sed -i '' 's|import { Box, Text } from "@chakra-ui/react";|import { Box, Text } from "@/components/ui/migration-helpers";|g' "$file"

    sed -i '' 's|import { VStack, HStack, Text } from "@chakra-ui/react";|import { VStack, HStack, Text } from "@/components/ui/migration-helpers";|g' "$file"

    sed -i '' 's|import { Button } from "@chakra-ui/react";|import { Button } from "@/components/ui/migration-helpers";|g' "$file"

    sed -i '' 's|import { Input } from "@chakra-ui/react";|import { Input } from "@/components/ui/migration-helpers";|g' "$file"

    # Replace complex imports
    sed -i '' 's|from "@chakra-ui/react"|from "@/components/ui/migration-helpers"|g' "$file"

    # Replace specific Chakra components with native HTML
    sed -i '' 's|<Image |<img |g' "$file"
    sed -i '' 's|</Image>|</img>|g' "$file"

    # Replace useDisclosure with useState
    sed -i '' 's|const { isOpen, onOpen, onClose } = useDisclosure();|const [isOpen, setIsOpen] = useState(false); const onOpen = () => setIsOpen(true); const onClose = () => setIsOpen(false);|g' "$file"

    # Remove useDisclosure import
    sed -i '' 's|, useDisclosure||g' "$file"
    sed -i '' 's|useDisclosure, ||g' "$file"

    echo "✅ Updated: $file"
done

echo "🎉 Migration complete! Updated $(echo "$files_with_chakra" | wc -l) files"
echo "📦 Next step: Remove Chakra UI dependencies"