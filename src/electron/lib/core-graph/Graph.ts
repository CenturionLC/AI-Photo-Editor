import crypto from "crypto";

type UUID = string;

class UniqueEntity {
  private uuid: UUID;

  constructor() {
    this.uuid = UniqueEntity.genUUID();
  }
  get getUUID() {
    return this.uuid;
  }

  // 64-bit hex string (length 32 chars)
  private static genUUID(): UUID {
    // 1% chance of collision after 83 million years at 1 hash/ms 🫨
    return crypto.randomBytes(32).toString("hex");
  }
}

// Stores all the core graph representations in the current project
export class CoreGraphStore extends UniqueEntity {
  constructor(private graphs: { [key: UUID]: CoreGraph }) {
    super();
  }

  public createGraph(): UUID {
    const newGraph: CoreGraph = new CoreGraph();
    this.graphs[newGraph.getUUID] = newGraph;

    return newGraph.getUUID;
  }
}

// Effectively the "database" that we query to
// Acts as a 'publisher' for each 'subscriber' module
class CoreGraph extends UniqueEntity {
  private nodes: { [key: UUID]: Node };
  private anchors: { [key: UUID]: Anchor };
  private edges: { [key: UUID]: Edge };

  constructor() {
    super();
  }

  public createNode(node: Node) {
    // TODO
  }

  public removeNode(node: Node) {
    // TODO
  }

  public addEdge(anchorFrom: Node, anchorTo: Node) {
    // TODO
  }

  public removeEdge(id: string) {
    // nodeFrom: Node, nodeTo: Node switched this for edge id, since we have a handle to all edges
    // TODO
  }

  public copy() {
    // TODO
  }

  public subscribe() {
    // TODO
  }

  public unsubscribe() {
    // TODO
  }
}

class Node extends UniqueEntity {
  private anchors: { [key: string]: Anchor };
  private styling: NodeStyling;

  constructor(
    private name: string, // The name id of the node in the plugin
    private plugin: string // The name id of the plugin that defined the node
  ) {
    super();
  }
}

type AnchorType = string; // This uses MIME types E.g. "int", "text/json"
enum AnchorIO {
  input,
  output,
}

class Anchor extends UniqueEntity {
  constructor(private parent: Node, private ioType: AnchorIO, private type: AnchorType) {
    super();
  }
}

class Edge extends UniqueEntity {
  constructor(private anchorFrom: UUID, private anchorTo: UUID) {
    super();
  }
}

class NodeStyling {
  constructor(private position: { x: number; y: number }, private size: { w: number; h: number }) {}
}
