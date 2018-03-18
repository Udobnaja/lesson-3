export function updateCanvasSize({node, context}) {
    return [context.canvas.width = node.clientWidth, context.canvas.height = node.clientHeight];
}
