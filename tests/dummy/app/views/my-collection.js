import MagicCollectionView from "magic-collection-view/magic-collection-view";

export default MagicCollectionView.extend({
  itemViewClass: Ember.View.extend({
    tagName: 'tr',
    templateName: 'my-collection-item'
  })
});
