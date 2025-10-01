# AQUA Members Management System

This directory contains the new member management system that allows each team member to maintain their own profile in a separate file, while preserving rendering order and making maintenance much easier.

## 📁 Structure

```
src/members/
├── config.ts           # Schema definition and member ordering
├── yaml-loader.ts      # YAML frontmatter parser and utilities
├── data.ts            # Legacy data file (can be removed after migration)
├── profiles/          # Individual member profile files
│   ├── poramet.md
│   ├── rdv.md
│   ├── michal.md
│   └── ...
└── README.md          # This file
```

## 🎯 Benefits

✅ **Easy Maintenance**: Each member can edit their own file  
✅ **Preserved Order**: Rendering order controlled by `config.ts`  
✅ **Type Safety**: Zod schema validation ensures data consistency  
✅ **Git Friendly**: Individual files create cleaner git diffs  
✅ **Decentralized**: No more merge conflicts on a single large file  
✅ **Flexible**: Easy to add/remove members without touching other data

## 📝 Adding a New Member

1. Create a new file in `src/members/profiles/` with the format `{login}.md`
2. Use YAML frontmatter to define the member data:

```yaml
---
name: 'Your Name'
login: 'your_login'
role:
  - 'Your Role'
  - 'Current'
imagePath: '/images/members/your_image.jpg'
description: 'Your description here'
links:
  - name: 'Github'
    url: 'https://github.com/yourusername'
  - name: 'Google Scholar'
    url: 'https://scholar.google.com/...'
stat:
  - name: 'Strength'
    value: 85
    max: 100
  - name: 'Intelligence'
    value: 95
    max: 100
---
```

3. Add your login to the `memberOrder` array in `src/members/config.ts` in the position where you want to appear

## 🔧 Updating Your Profile

Simply edit your `.md` file in the `profiles/` directory. The changes will be reflected automatically.

### Profile Fields

- **name**: Your full name
- **login**: Your unique identifier (should match filename)
- **role**: Array of roles (include 'Current' or 'Alumni')
- **imagePath**: Path to your profile image
- **description**: Short bio or description
- **links**: Array of social/professional links
- **stat**: Array of fun stats (optional)

## 🔄 How It Works

1. **Order Control**: The `memberOrder` array in `config.ts` defines the rendering order
2. **Data Loading**: `yaml-loader.ts` reads individual profile files and aggregates them
3. **Validation**: Each profile is validated against the Zod schema
4. **Fallback**: Missing profiles are skipped with warnings

## 💻 Usage in Code

```typescript
import { loadAllMembers, getCurrentMembers, getAlumniMembers } from '../members/yaml-loader'

// Load all members in order
const allMembers = loadAllMembers()

// Get only current members
const currentMembers = getCurrentMembers()

// Get alumni
const alumni = getAlumniMembers()

// Load specific member
import { getMemberByLogin } from '../members/yaml-loader'
const member = getMemberByLogin('poramet')
```

## 🚀 Migration from Old System

The migration has been completed! All members from the old `data.ts` file have been converted to individual `.md` files.

### Migration Scripts Available

- `scripts/migrate-members-yaml.ts`: Convert from data.ts to individual .md files
- More scripts can be added as needed

## 📊 Statistics

- Total members: 50
- Current members: ~45
- Alumni: ~5
- Files successfully migrated: 50/50

## 🛠️ Maintenance

### Adding Member Order

Edit `src/members/config.ts` and add the login to the `memberOrder` array:

```typescript
export const memberOrder = [
	'rdv',
	'michal',
	// ... existing members
	'new_member_login', // Add here
]
```

### Validation

The system automatically validates each profile against the schema. Invalid profiles will be skipped with warnings.

### File Naming

- Use the member's login as the filename
- Use `.md` extension
- Sanitize special characters to use only `a-z`, `0-9`, `_`, and `-`

## 🔍 Troubleshooting

**Profile not showing?**

1. Check if the file exists in `profiles/`
2. Verify the login is in `memberOrder`
3. Check console for validation errors

**Invalid YAML?**

- Ensure proper indentation (2 spaces)
- Quote strings with special characters
- Check array formatting

**Image not loading?**

- Use absolute paths starting with `/`
- Or use full URLs for external images

---

_This new system makes it easy for everyone to maintain their profiles while keeping everything organized! 🎉_
