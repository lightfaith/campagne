var currentZIndex = 20;
function initDragElement(popup) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  
	var elmnt = null;
  //var currentZIndex = 100; //TODO reset z index when a threshold is passed

	var header = getHeader(popup);

	popup.onmousedown = function() {
		this.style.zIndex = "" + ++currentZIndex;
	};

	if (header) {
		header.parentPopup = popup;
		header.onmousedown = dragMouseDown;
	}

  function dragMouseDown(e) {
    elmnt = this.parentPopup;
    elmnt.style.zIndex = "" + ++currentZIndex;

    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!elmnt) {
      return;
    }

    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function getHeader(element) {
    
    /*var headerItems = element.getElementsByClassName("popup-header");

    if (headerItems.length === 1) {
      return headerItems[0];
    }

    return null;
	*/
	var first = element.children[0];
	if (first.classList.contains('popup-header'))
	  return first;
	else
	  return null;
  }
}

function initResizeElement(popup) {
  var element = null;
  var startX, startY, startWidth, startHeight;

  p = popup;
	var right = document.createElement("div");
	right.className = "resizer-right";
	p.appendChild(right);
	right.addEventListener("mousedown", initDrag, false);
	right.parentPopup = p;
	
	var bottom = document.createElement("div");
	bottom.className = "resizer-bottom";
	p.appendChild(bottom);
	bottom.addEventListener("mousedown", initDrag, false);
	bottom.parentPopup = p;

	var bottom_right = document.createElement("div");
	bottom_right.className = "resizer-bottom-right";
	p.appendChild(bottom_right);
	bottom_right.addEventListener("mousedown", initDrag, false);
	bottom_right.parentPopup = p;

  function initDrag(e) {
    element = this.parentPopup;
    direction = 'right';
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }
  
  function initDragLeft(e) {
    element = this.parentPopup;
    direction = 'left';
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function doDrag(e) {
    element.style.width = startWidth + e.clientX - startX + "px";
    element.style.height = startHeight + e.clientY - startY + "px";
  }

  function stopDrag() {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }
}

