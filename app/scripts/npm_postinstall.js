/**
 * npm post-install script
 *
 * This script copies MyMongoView to root dir, from where `npm i my-mongo-view` was called
 *
 * Copied from adminMongo package ;)
 */

var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;
var del = require('node-delete');

// __dirname = <root>/node_modules/my-mongo-view/lib/
var moduleDir = path.join(__dirname, './../../'); // <root>/node_modules/my-mongo-view/
var destinationDir = path.join(moduleDir, './../../'); // <root>

try {
  fs.statSync(path.join(moduleDir, './../../', 'node_modules'));
  // MyMongoView located under node_modules & right now installing by `npm install my-mongo-view`   
  Install();
    // So, we no need to do nothing here, just continue installation process
}
catch (err) {
  // MyMongoView cloned from repo and user launched `npm install` or `npm update` (maybe after `npm install my-mongo-view`)
  // Now we should figure out how this script was triggered
  try {
    fs.statSync(path.join(moduleDir, 'node_modules', 'my-mongo-view'));
    // my-mongo-view found in `node_modules` under <root>
    // Script triggered by `npm update`, cause we have unremoved `my-mongo-view` folder under node_modules
    npmUpdate();
  }
  catch (err) { // my-mongo-view not found in `node_modules` under <root>
    // Script triggered by user launched cmd `npm install`
    npmInstall();
  }
}

// npm i my-mongo-view
function Install() {
  console.log('\x1b[1m-=| MyMongoView Installation wizard |=-');
  console.log('\x1b[1m--------------------------------------------------------');
  console.log('\x1b[33m-> Copying installed MyMongoView from \n\x1b[36m' + moduleDir + '\x1b[33m\nto \n\x1b[36m' + destinationDir + ' \x1b[0m');

  ncp(moduleDir, destinationDir, function (err) {
    if (err) displayError(err);

    console.log('\x1b[1m--------------------------------------------------------');
    console.log('\x1b[33m-> Cleaning after installation...\x1b[0m');

    // Even after cleaning, folder `my-mongo-view` will stay under `node_modules`
    del([moduleDir + '*', moduleDir + '*/**'], { force: true }, function (err, paths) {
      if (err) displayError(err);

      // Delete `lib` folder from installed copy of MyMongoView
      // del.sync(path.join(destinationDir, 'lib'), { force: true });

      // console.log('\n', paths.join('\n')); // Display paths of deleted files/folders

      // Everything is okay, so just exit
      
      ManageDefaults();
      
    });

  });
}

function ManageDefaults(){
    
    del([path.join(destinationDir,'package.json')], { force: true }, function (err, paths) {
        if (err) displayError(err);
        console.log('Removing package.json of updation');
        console.log('\x1b[32m-=| MyMongoView successfully installed! |=-\x1b[0m');
        return process.exit(0);
    });
}

// npm install
function npmInstall() {
  // We no need to copy and delete anything, so just exit
  return process.exit(0);
}

// npm update
function npmUpdate() {
  // We no need to copy and delete anything, so just exit
  return process.exit(0);
}

function displayError(err, willExit) {
  willExit = (willExit === undefined) ? true : willExit; // Set defaut to `true`
  console.log('\x1b[1m--------------------------------------------------------');
  console.log('\x1b[31mError occured :(');
  // Possibly multiple error lines.
  //TODO: Fix something here (typeof err === 'string' ? [err] : err).forEach(function (err) {
  console.log(err);
  // });
  console.log('\x1b[0m'); // Set back default console colors
  if (willExit) process.exit(1);
}