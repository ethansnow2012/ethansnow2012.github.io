import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import createDOMPurify from 'dompurify'
// import { JSDOM } from 'jsdom'

// const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

const rawHTML = '<div class="controls"><div>    <label for="linkDistance">Link Distance: <span id="linkValue">50</span></label>    <input type="range" id="linkDistance" min="0" max="200" step="1" value="50"></div><div>    <label for="chargeStrength">Charge Strength: <span id="chargeValue">-500</span></label>    <input type="range" id="chargeStrength" min="-1000" max="0" step="10" value="-500"></div><div>    <label for="collisionRadius">Collision Radius: <span id="collisionValue">36</span></label>    <input type="range" id="collisionRadius" min="0" max="100" step="1" value="36"></div><div>    <label for="attractStrength">Attract Strength: <span id="attractValue">0.2</span></label>    <input type="range" id="attractStrength" min="0" max="1" step="0.01" value="0.2"></div><div>    <label for="repelStrength">Repel Strength: <span id="repelValue">-0.084</span></label>    <input type="range" id="repelStrength" min="-0.1" max="0" step="0.002" value="-0.084"></div><div>  <label for="centerForceStrength">Center Force Strength: <span id="centerForceStrengthValue">0.1</span></label>  <input type="range" id="centerForceStrength" min="0" max="0.5" step="0.01" value="0.1"></div><div>    <label for="thresholdDistance">Threshold Distance: <span id="thresholdDistanceValue">850</span></label>    <input type="range" id="thresholdDistance" min="0" max="1000" step="10" value="850"></div><div>  <label for="groupInput">Group Identifier:</label>  <input type="text" id="groupInput" placeholder="Enter group identifier e.g., src/pages">  <button onclick="updateGroup()">Update Group</button>  <div style="opacity: 0.5;">(input the folder dir)</div></div></div><svg id="asdiuh" viewBox="0 0 960 600" width="960" height="600"  style="width: 100vw; height: 100vh;"><defs>  <marker id="arrow" class="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">      <path d="M0,3 L9,6 L9,0 Z" fill="#999"></path>  </marker>  <marker id="arrow-solid" class="arrow-solid" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">    <path d="M0,3 L9,6 L9,0 Z" fill="#999"></path>  </marker></defs></svg> '

const Styled = styled.div`
        body { margin: 0; position: fixed; top: 0; right: 0; bottom: 0; left: 0; }
        input[type='text'] {    background: antiquewhite;}
        .controls { position: fixed; top: 10px; left: 10px; z-index: 10; }
        .links line { stroke: #999; stroke-opacity: 0.2; }
        .nodes circle { stroke: #fff; stroke-width: 1.5px; cursor: pointer; }
        .arrow { fill: #999; opacity: 0.2;}
        .arrow-solid { fill: #999; opacity: 1;}
`


export const D3GraphFileNodeViewer = () => {
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/fileGraph.json');
                const data = await response.json();
                setGraphData(data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (!graphData) return;
        var svg = d3.select("#asdiuh"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            centerX = width / 2,
            centerY = height / 2;

            var graph = graphData
 
var nodes = graph.nodes.map(node => {
    let groupKey = node.path.split('/').slice(0, -1).join('/'); // Splits the path by '/', removes the last segment, and joins it back
    
    return {
        id: node.path,  // Using the 'path' as a unique identifier for each node
        layer: node.layer,
        group: groupKey
    };
});

        // Creating a lookup to find node objects by their path, which is necessary for link references
        var nodeMap = {};
        nodes.forEach(node => {
            nodeMap[node.id] = node;
        });

        // Processing links to use node references based on the 'nodeMap'
        var links = graph.edges.map(link => {
            return {
                source: nodeMap[link.node1.path],  // Link source to node object
                target: nodeMap[link.node2.path],  // Link target to node object
                layer: Math.min(link.node1.layer, link.node2.layer)  // Optional: storing layer info, if needed
            };
        });
        function dragstarted(event, d) {
            if (!event.active) {
              simulation.alphaTarget(0.02).restart(); // Increase alpha target to "heat up" the simulation
            }
            d.fx = d.x;
            d.fy = d.y;
        }
        

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        var linkDistance = document.getElementById('linkDistance'),
            chargeStrength = document.getElementById('chargeStrength'),
            collisionRadius = document.getElementById('collisionRadius'),
            attractStrength = document.getElementById('attractStrength'),
            repelStrength = document.getElementById('repelStrength');

        var linkDisplay = document.getElementById('linkValue'),
            chargeDisplay = document.getElementById('chargeValue'),
            collisionDisplay = document.getElementById('collisionValue'),
            attractDisplay = document.getElementById('attractValue'),
            repelDisplay = document.getElementById('repelValue');

        var centerForceStrengthInput = document.getElementById('centerForceStrength');
        var thresholdDistanceInput = document.getElementById('thresholdDistance');
        var centerForceStrengthDisplay = document.getElementById('centerForceStrengthValue');
        var thresholdDistanceDisplay = document.getElementById('thresholdDistanceValue');

        centerForceStrengthInput.addEventListener('input', function() {
            var newStrength = parseFloat(this.value);
            centerForceStrengthDisplay.textContent = newStrength;
            simulation.force("groupCenter", groupCenterForce(newStrength, centerX, centerY, parseFloat(thresholdDistanceInput.value)))
              .alpha(simulAlpha)
              .alphaDecay(simulAlphaDecay)
              .restart();
            fastTick();
        });

        thresholdDistanceInput.addEventListener('input', function() {
            var newThreshold = parseFloat(this.value);
            thresholdDistanceDisplay.textContent = newThreshold;
            simulation.force("groupCenter", groupCenterForce(parseFloat(centerForceStrengthInput.value), centerX, centerY, newThreshold))
              .alpha(simulAlpha)
              .alphaDecay(simulAlphaDecay)
              .restart();
            fastTick();
        });

        var currentGroup = 'src/pages';  // Default group
        document.getElementById('groupInput').value = currentGroup;  // Set default value in input

        function updateGroup() {
            currentGroup = document.getElementById('groupInput').value;
            simulation.force("groupCenter", groupCenterForce(parseFloat(centerForceStrengthInput.value), centerX, centerY, parseFloat(thresholdDistanceInput.value), currentGroup))
              .alpha(simulAlpha)
              .alphaDecay(simulAlphaDecay)
              .restart();
            fastTick();
        }
        
        function groupCenterForce(strength, centerX, centerY, threshold) {
            return function() {
                nodes.forEach(function(node) {
                    let dx = centerX - node.x;
                    let dy = centerY - node.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < threshold) { // Only apply force if outside the threshold distance
                        if (node.group === currentGroup) {
                            // Attract to center
                            node.vx += dx * strength;
                            node.vy += dy * strength;
                        } else {
                            // Repel from center
                            node.vx -= dx * strength;
                            node.vy -= dy * strength;
                        }
                    }
                });
            };
        }
        

        linkDistance.addEventListener('input', updateForceParameters);
        chargeStrength.addEventListener('input', updateForceParameters);
        collisionRadius.addEventListener('input', updateForceParameters);
        attractStrength.addEventListener('input', updateForceParameters);
        repelStrength.addEventListener('input', updateForceParameters);

        function updateForceParameters() {
            linkDisplay.textContent = linkDistance.value;
            chargeDisplay.textContent = chargeStrength.value;
            collisionDisplay.textContent = collisionRadius.value;
            attractDisplay.textContent = attractStrength.value;
            repelDisplay.textContent = repelStrength.value;

            simulation.force("link").distance(+linkDistance.value);
            simulation.force("charge").strength(+chargeStrength.value);
            simulation.force("collision").radius(+collisionRadius.value);
            simulation.force("group", forceCluster());
            simulation
              .alpha(simulAlpha)
              .alphaDecay(simulAlphaDecay)
              .restart();
            fastTick();
        }

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var centerForceStrength = 0.1;
        var thresholdDistance = 300; // Distance threshold within which no force is applied

        var simulAlpha = 1;
        var simulAlphaDecay = 0.05;

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id).distance(+linkDistance.value))
            .force("charge", d3.forceManyBody().strength(+chargeStrength.value))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(+collisionRadius.value))
            .force("group", forceCluster())
            .force("groupCenter", groupCenterForce(centerForceStrength, centerX, centerY, thresholdDistance));

        svg.on("wheel", function(event) {
            event.preventDefault(); // Prevent the default scroll behavior
            centerX += event.deltaX;
            centerY += event.deltaY;
            simulation.force("center", d3.forceCenter(centerX, centerY))
              // .alpha(simulAlpha)
              // .alphaDecay(simulAlphaDecay)
              .restart();
            // fastTick();
        });

        function forceCluster() {
            return function force(alpha) {
                nodes.forEach(node => {
                    nodes.forEach(other => {
                        if (node !== other) {
                            if (node.group === other.group) {
                                node.vx += (other.x - node.x) * parseFloat(attractStrength.value) * alpha;
                                node.vy += (other.y - node.y) * parseFloat(attractStrength.value) * alpha;
                            } else {
                                node.vx += (node.x - other.x) * parseFloat(repelStrength.value) * alpha;
                                node.vy += (node.y - other.y) * parseFloat(repelStrength.value) * alpha;
                            }
                        }
                    });
                });
            };
        }

        

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", 2)
            .attr("marker-start", "url(#arrow)");

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(nodes)
            .enter().append("g")
            .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended))
            .on("mouseover", mouseoverNode)
            .on("mouseout", mouseoutNode);

        function mouseoverNode(event, d) {
            // Update link style and ensure marker visibility
            link.each(function(l) {
                if (l.source === d || l.target === d) {
                    d3.select(this)
                    .style('stroke-opacity', 1)
                    .style('stroke', '#666')
                    .attr("marker-start", "url(#arrow-solid)")
                    
                } else {
                    d3.select(this)
                      .style('stroke-opacity', 0.2)
                      .style('stroke', '#999')
                      .attr("marker-start", "url(#arrow)")
                }
            });
        }
        function mouseoutNode() {
            link
              .select()
              .style('stroke-opacity', 0.2)
              .style('stroke', '#999')
              .attr("marker-start", "url(#arrow)")
            svg.selectAll('.arrow').style('opacity', 0.2);
        }

        node.append("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group));

        node.append("text")
            .text(d => d.id)
            .attr('x', 8)
            .attr('y', 3);

        simulation
            .alpha(simulAlpha)
            .alphaDecay(simulAlphaDecay)
            .nodes(nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(links);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x}, ${d.y})`);
        }

        // Optionally run multiple simulation steps on initialization
        function fastTick(){
          for (var i = 0; i < 1000; i++) simulation.tick();
        }
        
        fastTick()
        console.log('777')
    },[graphData])
    return (
  <Styled>
    
    { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} /> }
  </Styled>
    )
}
