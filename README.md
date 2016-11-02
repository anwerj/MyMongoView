<!--- head --->
# MyMongoView
MyMongoView provides easy, customizable views to query MongoDB. And above all that it gives most informative and beautiful approach to your MongoDB Document.

<!--- head.installation -->
### Installation

Install MyMongoView with npm, create a directory and run given command from that directory.
``` bash
npm install my-mongo-view
```

Setup your MongoDB Connections from `config.json` file. There is a default connections with default views.
Just change connections.string to your MongoDB instances.    
> You can also add multiple connections.

**Connection Parameters :**

*name* : Name of the connection to remember by (kind of important)    
*string* : Complete path to your MongoDB instances. (You can use authentication in string itself).    
> `"string" : "mongodb://username:password@host/database"`

*container* : Name to the directory where your views and cache are saved.    
> You can have multiple container, ideally a container belongs to one database. You can use same container on different environments.    
> A container must have two writable directories, **views** and **cache.**

*config* and *options* fields are not yet it used.
<!--- head.views --->
### Views

Views are actually the queries which you hate to write. You can write views based on your collection, your primary keys or just for one single value to search for.

MyMongoView views has there own structure which could be `js|json`.    

**Views Parameters :**

*name* : Name of the view to remember by (again kind of important)    
*collection* : You can set a default collection to view. If set, it will query right when you open view, otherwise it will ask you to select a collection.
*prompt* : Perhaps the most important feature of MyMongoView. Here you defines your query.

> **Prompt** is an object having collection fields as keys and operations + dataType as value.    
> **Default values for  operator is *eq* and dataType is string. 

You can read more about prompts here

> MyMongoView will return actual query with the result so that you don't get out of touch

<!--- actions --->
### Actions
Currently MyMongoView supports three actions find, aggregate and distinct. Every action comes with its own set of fields.

<!--- actions.find --->
#### Find
Find actions accepts all filters and sort options.

#### Aggregate
Other that just filters and sort options, you will be asked for aggregate related fields like $group and $accumulator.

#### Distinct
This action will ask for key to find distinct values for. Remember it does not have limit so use vary carefully.