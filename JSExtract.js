var JSExtract = JSExtract || {};

JSExtract.dynamic = ((self) => {
  self.tree = {
    name: ".",
    type: "root",
    callback: null,
    next: []
  };

  self.append = ((command, callback) => {
    let nodes = command.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
    let previous = self.tree, active;

    for(let i = 0, len = nodes.length; i < len; i++) {
      active = false;

      var node = {
        name: nodes[i],
        type: "node",
        callback: null,
        next: []
      };

      if(node.name[0] == "@") node.type = "text";

      if(i == len - 1) {
        node.callback = callback;
        node.next = null;
      }

      for(let j = 0, _len = previous.next.length; j < _len; j++) {
        if(previous.next[j].name == nodes[i]) {
          previous = previous.next[j];
          active = true;
          break;
        }
      }

      if(!active) {
        previous = _append(previous.next, node);
      }
    }

    console.log(self.tree);
  });

  self.search = ((command) => {
    let nodes = command.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
    let previous = self.tree, active;

    for(let i = 0, len = nodes.length; i < len; i++) {
      active = false;

      if(previous.next != null) {
        for(let j = 0, _len = previous.next.length; j < _len; j++) {
          if(previous.next[j].type == "node" || previous.next[j].type == "root") {
            if(previous.next[j].name == nodes[i]) {
              previous = previous.next[j];
              active = true;
              break;
            }
          } else {
            let nodeName = nodes[i][0] == "'" || nodes[i][0] == "\"" ? nodes[i].substring(1, nodes[i].length - 1) : nodes[i];
            let regex = new RegExp("^" + previous.next[j].name.substring(1) + "$", "g");

            if(regex.test(nodeName)) {
              previous = previous.next[j];
              active = true;
              break;
            }
          }
        }

        if(!active) break;
      } else {
        break;
      }
    }

    if(active) {
      previous.callback(command);
    } else {
      console.log("'" + command + "' is not recognized as an internal command");
    }
  });

  function _append (preventNode, currentNode) {
    return (preventNode[preventNode.length] = currentNode);
  };

  self.statistic = ((parent, depth) => {
    if(depth == 1) {
      document.write(".<br>");
    }

    if(parent.next != null) {
      for(let i = 0, len = parent.next.length; i < len; i++) {
        let startCharacter = i == len - 1 ? "`" : "|";

        if(depth == 1) {
          document.write(startCharacter + "-- ");
        } else {
          document.write(Array(depth).join("|" + Array(4).join("&nbsp;")) + startCharacter + "-- ");
        }

        document.write(parent.next[i].name + " <small><strong>[" + parent.next[i].type + "]</strong></small><br>");
        self.statistic(parent.next[i], depth + 1);
      }
    }
  });

  return self;
})(JSExtract || {});