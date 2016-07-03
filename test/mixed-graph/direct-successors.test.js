'use strict';

const test = require('ava');

const MixedGraph = require('../../lib/mixed-graph');

const createVertex = utils.createVertex;

test.only('should return empty set if no successors', t => {
    const graph = new MixedGraph();
    const vertex = createVertex({ block: 'button' });

    const successors = graph.directSuccessors(vertex);

    t.deepEqual(Array.from(successors), []);
});

test('should return successors for unordered graph', t => {
    const graph = new MixedGraph();
    const vertex1 = createVertex({ block: 'button' });
    const vertex2 = createVertex({ block: 'control' });

    graph.addEdge(vertex1, vertex2);

    const successors = graph.directSuccessors(vertex1);

    t.deepEqual(Array.from(successors), [vertex2]);
});

test('should return successors for ordered graph', t => {
    const graph = new MixedGraph();
    const vertex1 = createVertex({ block: 'button' });
    const vertex2 = createVertex({ block: 'control' });

    graph.addEdge(vertex1, vertex2, { ordered: true });

    const successors = graph.directSuccessors(vertex1);

    t.deepEqual(Array.from(successors), [vertex2]);
});

test('should return successors for mixed one-level graph', t => {
    const graph = new MixedGraph();
    const vertex1 = createVertex({ block: 'button' });
    const vertex2 = createVertex({ block: 'control' });
    const vertex3 = createVertex({ block: 'icon' });

    graph.addEdge(vertex1, vertex2);
    graph.addEdge(vertex1, vertex3, { ordered: true });

    const successors = graph.directSuccessors(vertex1);

    t.deepEqual(Array.from(successors), [vertex2, vertex3]);
});

test('should return successors for mixed one-level graph', t => {
    const graph = new MixedGraph();
    const vertex1 = createVertex({ block: 'button' });
    const vertex2 = createVertex({ block: 'control' });
    const vertex3 = createVertex({ block: 'icon' });

    graph.addEdge(vertex1, vertex2);
    graph.addEdge(vertex1, vertex3, { ordered: true });

    const successors = graph.directSuccessors(vertex1);

    t.deepEqual(Array.from(successors), [vertex2, vertex3]);
});

test('should return successors for mixed one-level graph (ordered first)', t => {
    const graph = new MixedGraph();
    const vertex1 = createVertex({ block: 'button' });
    const vertex2 = createVertex({ block: 'control' });
    const vertex3 = createVertex({ block: 'icon' });

    graph.addEdge(vertex1, vertex2, { ordered: true });
    graph.addEdge(vertex1, vertex3);

    const successors = graph.directSuccessors(vertex1);

    t.deepEqual(Array.from(successors), [vertex2, vertex3]);
});