const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

// Load the schema
const schemaPath = path.join(__dirname, 'skill-schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validate = ajv.compile(schema);

// Find all JSON files in skills directory
function findJsonFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Validate a single file
function validateFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);

  console.log(`\nValidating: ${relativePath}`);

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`  ❌ Failed to read file: ${err.message}`);
    return false;
  }

  let data;
  try {
    data = JSON.parse(content);
  } catch (err) {
    console.error(`  ❌ Invalid JSON: ${err.message}`);
    return false;
  }

  const valid = validate(data);

  if (valid) {
    console.log(`  ✅ Valid`);
    console.log(`     Name: ${data.name}`);
    console.log(`     Action: ${data.action}`);
    console.log(`     Categories: ${data.categories.length}`);
    const instructionCount = data.categories.reduce((sum, cat) => sum + cat.instructions.length, 0);
    console.log(`     Instructions: ${instructionCount}`);
    return true;
  } else {
    console.error(`  ❌ Validation errors:`);
    for (const error of validate.errors) {
      const location = error.instancePath || '(root)';
      console.error(`     - ${location}: ${error.message}`);
      if (error.params) {
        const params = Object.entries(error.params)
          .map(([k, v]) => `${k}=${v}`)
          .join(', ');
        console.error(`       (${params})`);
      }
    }
    return false;
  }
}

// Main
const skillsDir = path.join(process.cwd(), 'skills');
const jsonFiles = findJsonFiles(skillsDir);

if (jsonFiles.length === 0) {
  console.log('No JSON files found in skills/ directory');
  process.exit(0);
}

console.log(`Found ${jsonFiles.length} skill file(s) to validate`);
console.log('='.repeat(50));

let hasErrors = false;

for (const file of jsonFiles) {
  const valid = validateFile(file);
  if (!valid) {
    hasErrors = true;
  }
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ Validation failed - please fix the errors above');
  process.exit(1);
} else {
  console.log(`✅ All ${jsonFiles.length} skill(s) are valid`);
  process.exit(0);
}
