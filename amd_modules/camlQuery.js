
'use strict';

/**
 * camlQuery(options);
 *
 * options           <Object>     Object that contians the caml query's arguments (see below)
 *
 * options.listName  <String>     Name of the library/list to perform the query on.
 * options.camlQuery <String>     Caml query to execute on the list.
 * options.onSuccess <Function>   Function to call that executes when the request succeeded.
 * options.onFailure <Function>   Function to call that executes when the request fails.
 */

define(function() {
    return function(options) {
        var executeCamlQuery = camlQuery.bind(options);
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            executeCamlQuery();
        });
    }
});

function camlQuery() {
    var listName = typeof this.listName === 'string' ? this.listName : '',
        camlQuery = typeof this.camlQuery === 'string' ? this.camlQuery : '',
        clientContext = new SP.ClientContext.get_current(),
        oLibrary = clientContext.get_web().get_lists().getByTitle(listName),
        spCamlQuery = new SP.CamlQuery();

    spCamlQuery.set_viewXml(camlQuery);
    this.collection = oLibrary.getItems(spCamlQuery);

    clientContext.load(this.collection);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, onSuccess),
        Function.createDelegate(this, onFailure)
    );
}

function onFailure(sender, args) {
    if (typeof this.onFailure === 'function') {
        this.onFailure(args.get_message(), args.get_stackTrace());
    } else {
        console.warn('Caml Query failed: ' + args.get_message() + '\n' + args.get_stackTrace());
    }
}

function onSuccess(sender, args) {
    var queryResults = [];
    var itemEnumerator = this.collection.getEnumerator();
    while (itemEnumerator.moveNext()) {
        var oListItem = itemEnumerator.get_current();
        console.log(oListItem.get_fieldValues());
        queryResults.push(oListItem.get_fieldValues());
    }
    if (typeof this.onSuccess === 'function') {
        this.onSuccess(queryResults);
    } else {
        console.warn('The Caml Query succeeded however no onSuccess function was found to pass the results.');
    }
}
