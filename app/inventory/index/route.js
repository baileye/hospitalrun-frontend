import AbstractIndexRoute from 'hospitalrun/routes/abstract-index-route';
import UserSession from 'hospitalrun/mixins/user-session';
export default AbstractIndexRoute.extend(UserSession, {
  modelName: 'inv-request',
  newButtonAction: function() {
    if (this.currentUserCan('add_inventory_request')) {
      return 'newRequest';
    } else {
      return null;
    }
  }.property(),
  newButtonText: '+ new request',
  pageTitle: 'Requests',

  _getStartKeyFromItem: function(item) {
    var itemId = this._getPouchIdFromItem(item);
    return ['Requested', null, itemId];
  },

  _modelQueryParams: function() {
    var maxValue = this.get('maxValue');
    return {
      options: {
        startkey: ['Requested', null, null],
        endkey: ['Requested', maxValue, maxValue]
      },
      mapReduce: 'inventory_request_by_status'
    };
  },

  actions: {
    fulfill: function(item) {
      item.set('dateCompleted', new Date());
      this.transitionTo('inventory.request', item);
    }
  }
});
