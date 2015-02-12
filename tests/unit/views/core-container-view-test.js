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

  // run(function() {
  //   container.appendTo('#qunit-fixture');
  // });

  view = View.create({
    template: function() {
      return "This is my moment";
    }
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

  var view1 = View.create({
    template: function() {
      return "1";
    }
  });

  var view2 = View.create({
    template: function() {
      return "2";
    }
  });

  var view3 = View.create({
    template: function() {
      return "3";
    }
  });

  run(function() {
    container.insertBefore(view1, null);
    container.insertBefore(view2, null);
    container.insertBefore(view3, null);
    container.appendTo('#qunit-fixture');
  });

  equal(trim(container.$().text()), "123");

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

  equal(trim(container.$().text()), "312");
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

  equal(trim(container.$().text()), "132");
  equal(container._firstChild, view1, "view1 is the first child");
  equal(container._lastChild, view2,  "view2 is the last child");
  equal(container._firstChild._previousSibling, null, "first child's previous sibling is null");
  equal(container._firstChild._nextSibling, view3, "first child's next sibling is view3");
  equal(container._firstChild._nextSibling._previousSibling, view1, "second child's previous sibling is view1");
  equal(container._firstChild._nextSibling._nextSibling, view2, "second child's next sibling is view2");
  equal(container._firstChild._nextSibling._nextSibling._previousSibling, view3, "third child's previous sibling is view3");
  equal(container._firstChild._nextSibling._nextSibling._nextSibling, null, "third child's next sibling is null");

  run(function() {
    debugger;
    container.insertBefore(view2, view3);
  });

  equal(trim(container.$().text()), "123");
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
