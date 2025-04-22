const { ActionRunner } = require('../src/simulator/action-runner');
const { ContextBuilder } = require('../src/simulator/context-builder');
const { parseYaml } = require('../src/parser/yaml-parser');
const fs = require('fs');
const path = require('path');

describe('Simulator Tests', () => {
    let actionRunner;
    let contextBuilder;
    let workflow;

    beforeAll(() => {
        const yamlFilePath = path.join(__dirname, 'fixtures', 'sample-workflow.yml');
        const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
        workflow = parseYaml(yamlContent);
        contextBuilder = new ContextBuilder();
        actionRunner = new ActionRunner();
    });

    test('should create context from workflow', () => {
        const context = contextBuilder.build(workflow);
        expect(context).toHaveProperty('repository');
        expect(context).toHaveProperty('event');
        expect(context).toHaveProperty('actor');
    });

    test('should run action and log output', async () => {
        const action = workflow.jobs.build.steps[0]; // Assuming the first step is an action
        const output = await actionRunner.runAction(action, contextBuilder.build(workflow));
        expect(output).toContain('Action executed successfully');
    });

    test('should handle action errors gracefully', async () => {
        const action = { name: 'invalid-action', run: 'exit 1' }; // Simulating an invalid action
        await expect(actionRunner.runAction(action, contextBuilder.build(workflow))).rejects.toThrow('Action failed');
    });
});