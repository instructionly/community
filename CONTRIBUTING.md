# Contributing Skills

Thanks for contributing to the Instructionly community! This guide explains how to submit your skills for others to use.

## How to Contribute

### 1. Fork this repository

Click the "Fork" button at the top right of this page to create your own copy.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR-USERNAME/community.git
cd community
```

### 3. Create your skill file

Add your skill JSON file to the appropriate category folder:

```
skills/
├── react/
├── typescript/
├── python/
├── code-review/
├── testing/
├── devops/
├── security/
└── general/
```

If your category doesn't exist, create it!

### 4. Add your skill to the catalog

Update `skills/README.md` to include your skill in the **Available Skills** section:

1. Find or create the category section (e.g., `### React`, `### Python`)
2. Add a row to the table with your skill file and description

Example:
```markdown
### Python

| Skill | Description |
|-------|-------------|
| [fastapi-guidelines.json](./python/fastapi-guidelines.json) | Best practices for FastAPI development |
```

### 5. Submit a Pull Request

Push your changes and open a PR to the main repository.

## Skill JSON Format

Each skill file should follow this structure:

```json
{
  "name": "React Best Practices",
  "action": "code",
  "executionMode": "auto",
  "description": "Guidelines for writing clean, maintainable React code",
  "categories": [
    {
      "name": "Component Structure",
      "description": "How to structure React components",
      "instructions": [
        {
          "content": "Use functional components with hooks instead of class components",
          "type": "direct"
        },
        {
          "content": "When creating a new component",
          "type": "conditional",
          "subInstructions": [
            "Use named exports instead of default exports",
            "Define props interface as ComponentNameProps",
            "Place the props interface directly above the component"
          ]
        }
      ]
    }
  ]
}
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Skill name (1-100 characters) |
| `action` | Yes | One of: `analyze`, `plan`, `design`, `code`, `test`, `review`, `debug`, `commit`, `deploy` |
| `executionMode` | Yes | `auto` or `always` |
| `description` | Yes | Brief description of the skill |
| `categories` | Yes | Array of instruction categories |

### Category Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Category name |
| `description` | No | What this category covers |
| `instructions` | Yes | Array of instructions |

### Instruction Types

**Direct instructions** - Always apply:
```json
{
  "content": "Use TypeScript for all files",
  "type": "direct"
}
```

**Conditional instructions** - Apply in specific situations:
```json
{
  "content": "When handling errors",
  "type": "conditional",
  "subInstructions": [
    "Log the error with context",
    "Return a user-friendly message",
    "Never expose stack traces in production"
  ]
}
```

## File Naming

Use kebab-case for file names:
- `react-best-practices.json`
- `typescript-strict-mode.json`
- `python-fastapi-guidelines.json`

## Quality Guidelines

Before submitting, ensure your skill:

- [ ] Has a clear, descriptive name
- [ ] Uses the correct JSON format
- [ ] Contains actionable instructions (not vague suggestions)
- [ ] Doesn't duplicate existing skills
- [ ] Is tested by importing into Instructionly
- [ ] Is added to `skills/README.md` catalog

## Testing Your Skill

1. Go to your Instructionly workspace
2. Navigate to Skills
3. Click "Import" and upload your JSON file
4. Verify all categories and instructions imported correctly

## Review Process

1. Submit your PR
2. Maintainers review for format and quality
3. Feedback provided if changes needed
4. Once approved, your skill is merged and available to everyone!

## License

By contributing, you agree that your skill will be shared under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), allowing others to use and adapt it with attribution.

## Questions?

Open a [Discussion](https://github.com/instructionly/community/discussions) if you need help!
