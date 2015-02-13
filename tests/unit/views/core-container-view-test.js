/*globals Ember QUnit test equal */
var get = Ember.get; // import { get } from "ember-metal/property_get";
var set = Ember.set; // import { set } from "ember-metal/property_set";
var run = Ember.run; // import run from "ember-metal/run_loop";
var jQuery = Ember.$; // import jQuery from "ember-views/system/jquery";
var View = Ember.View; // import View from "ember-views/views/view";
// import { computed } from "ember-metal/computed";
// import Controller from "ember-runtime/controllers/controller";
import CoreContainerView from "magic-collection-view/core-container-view";
var trim = jQuery.trim;

var container, view;

function createView(content) {
  return View.create({
    template: function() {
      return content;
    }
  });
}

QUnit.module("CoreContainerView", {
  teardown: function() {
    run(function() {
      container.destroy();
      if (view) { view.destroy(); }
    });
  }
});

test("hello world", function() {
  container = CoreContainerView.create({
    container: {}
  });

  view = View.create({
    template: Ember.HTMLBars.compile("This is my moment")
  });

  run(function() {
    container.insertBefore(view, null);
    container.appendTo('#qunit-fixture');
  });

  equal(view.container, container.container, 'view gains its containerViews container');
  equal(trim(container.$().text()), "This is my moment");
  equal(view._parentView, container, 'view\'s _parentView is the container');

  run(function() {
    container.removeChild(view);
  });

  equal(trim(container.$().text()), "");

  run(function() {
    container.insertBefore(view, null);
  });

  equal(view.container, container.container, 'view gains its containerViews container');
  equal(trim(container.$().text()), "This is my moment");
  equal(view._parentView, container, 'view\'s _parentView is the container');
});

test("insertBefore", function() {
  container = CoreContainerView.create({
    container: {}
  });

  var view1 = createView("1");
  var view2 = createView("2");
  var view3 = createView("3");

  run(function() {
    container.insertBefore(view1, null);
    container.insertBefore(view2, null);
    container.insertBefore(view3, null);
    container.appendTo('#qunit-fixture');
  });

  equal(trim(container.$().text()), "123", "initial output looks good");

  equal(container._firstChild, view1, "view1 is the first child");
  equal(container._lastChild, view3,  "view3 is the last child");
  equal(container._firstChild._previousSibling, null, "first child's previous sibling is null");
  equal(container._firstChild._nextSibling, view2, "first child's next sibling is view2");
  equal(container._firstChild._nextSibling._previousSibling, view1, "second child's previous sibling is view1");
  equal(container._firstChild._nextSibling._nextSibling, view3, "second child's next sibling is view3");
  equal(container._firstChild._nextSibling._nextSibling._previousSibling, view2, "third child's previous sibling is view2");
  equal(container._firstChild._nextSibling._nextSibling._nextSibling, null, "third child's next sibling is null");

  run(function() {
    container.insertBefore(view3, view1);
  });

  equal(trim(container.$().text()), "312", "after first move, DOM looks good");
  equal(container._firstChild, view3, "view3 is the first child");
  equal(container._lastChild, view2,  "view2 is the last child");
  equal(container._firstChild._previousSibling, null, "first child's previous sibling is null");
  equal(container._firstChild._nextSibling, view1, "first child's next sibling is view1");
  equal(container._firstChild._nextSibling._previousSibling, view3, "second child's previous sibling is view3");
  equal(container._firstChild._nextSibling._nextSibling, view2, "second child's next sibling is view2");
  equal(container._firstChild._nextSibling._nextSibling._previousSibling, view1, "third child's previous sibling is view1");
  equal(container._firstChild._nextSibling._nextSibling._nextSibling, null, "third child's next sibling is null");

  run(function() {
    container.insertBefore(view1, view3);
  });

  equal(trim(container.$().text()), "132", "after second move, DOM looks good");
  equal(container._firstChild, view1, "view1 is the first child");
  equal(container._lastChild, view2,  "view2 is the last child");
  equal(container._firstChild._previousSibling, null, "first child's previous sibling is null");
  equal(container._firstChild._nextSibling, view3, "first child's next sibling is view3");
  equal(container._firstChild._nextSibling._previousSibling, view1, "second child's previous sibling is view1");
  equal(container._firstChild._nextSibling._nextSibling, view2, "second child's next sibling is view2");
  equal(container._firstChild._nextSibling._nextSibling._previousSibling, view3, "third child's previous sibling is view3");
  equal(container._firstChild._nextSibling._nextSibling._nextSibling, null, "third child's next sibling is null");

  run(function() {
    container.insertBefore(view2, view3);
  });

  equal(trim(container.$().text()), "123", "after third move, DOM looks good");
  equal(container._firstChild, view1, "view1 is the first child");
  equal(container._lastChild, view3,  "view3 is the last child");
  equal(container._firstChild._previousSibling, null, "first child's previous sibling is null");
  equal(container._firstChild._nextSibling, view2, "first child's next sibling is view2");
  equal(container._firstChild._nextSibling._previousSibling, view1, "second child's previous sibling is view1");
  equal(container._firstChild._nextSibling._nextSibling, view3, "second child's next sibling is view3");
  equal(container._firstChild._nextSibling._nextSibling._previousSibling, view2, "third child's previous sibling is view2");
  equal(container._firstChild._nextSibling._nextSibling._nextSibling, null, "third child's next sibling is null");

  run(function() {
    view1.destroy();
    view2.destroy();
    view3.destroy();
  });
});

test("insertBefore: inserts correctly when in DOM", function() {
  container = CoreContainerView.create({
    container: {}
  });

  var view1 = createView("1");
  var view2 = createView("2");
  var view3 = createView("3");
  var view4 = createView("4");

  run(function() {
    container.appendTo('#qunit-fixture');
  });

  run(function() {
    container.insertBefore(view1, null);
  });

  equal(trim(container.$().text()), "1");

  run(function() {
    container.insertBefore(view2, null);
  });

  equal(trim(container.$().text()), "12");

  run(function() {
    container.insertBefore(view3, view2);
  });

  equal(trim(container.$().text()), "132");

  run(function() {
    container.insertBefore(view4, view1);
  });

  equal(trim(container.$().text()), "4132");

  run(function() {
    view1.destroy();
    view2.destroy();
    view3.destroy();
    view4.destroy();
  });
});
