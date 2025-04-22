const fs = require('fs');
const path = require('path');
const parseYaml = require('../src/parser/yaml-parser').parseYaml;

describe('YAML Parser', () => {
    const sampleWorkflowPath = path.join(__dirname, 'fixtures', 'sample-workflow.yml');

    it('should parse a valid YAML workflow file', async () => {
        const yamlContent = fs.readFileSync(sampleWorkflowPath, 'utf8');
        const parsedData = parseYaml(yamlContent);
        
        expect(parsedData).toBeDefined();
        expect(parsedData).toHaveProperty('name');
        expect(parsedData).toHaveProperty('on');
        expect(parsedData).toHaveProperty('jobs');
    });

    it('should throw an error for an invalid YAML file', () => {
        const invalidYaml = 'invalid: yaml: content';
        
        expect(() => parseYaml(invalidYaml)).toThrow();
    });

    it('should handle missing required fields gracefully', () => {
        const incompleteYaml = `
        name: Test Workflow
        jobs:
          build:
            runs-on: ubuntu-latest
        `;
        
        const parsedData = parseYaml(incompleteYaml);
        
        expect(parsedData).toBeDefined();
        expect(parsedData).toHaveProperty('name', 'Test Workflow');
        expect(parsedData).toHaveProperty('jobs');
        expect(parsedData.jobs).toHaveProperty('build');
        expect(parsedData.jobs.build).not.toHaveProperty('steps'); // Assuming steps are required
    });
});