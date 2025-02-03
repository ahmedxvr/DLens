// const { MongoClient } = require('mongodb');
var MongoClient = require('mongodb').MongoClient

const fs = require('fs');

// Connection URL
const url = 'mongodb://ahmed:XvrLhr123@discoverydocdb.cluster-cl4o62qemt92.eu-west-2.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name
const dbName = 'discoverydocdb';


//Create a MongoDB client, open a connection to DocDB; as a replica set,
//  and specify the read preference as secondary preferred

MongoClient.connect(
    'mongodb://ahmed:XvrLhr123@discoverydocdb.cluster-cl4o62qemt92.eu-west-2.docdb.amazonaws.com:27017/?directConnection=true&tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false',
    {
        tlsCAFile: `global-bundle.pem` //Specify the DocDB; cert
    },
    function (err, client) {
        if (err)
            throw err;

        //Specify the database to be used
        db = client.db(dbName);

        //Specify the collection to be used
        col = db.collection('sample-collection');

        //Insert a single document
        col.insertOne({ 'hello': 'Amazon DocumentDB' }, function (err, result) {
            //Find the document that was previously written
            col.findOne({ 'hello': 'Amazon DocumentDB' }, function (err, result) {
                //Print the result to the screen
                console.log(result);

                //Close the connection
                client.close()
            });
        });
    });


// async function importData() {
//     try {
//         // Connect to the MongoDB client
//         await client.connect();
//         console.log('Connected successfully to server');

//         const db = client.db(dbName);
//         const collection = db.collection('addresses');

//         // Read the JSON file
//         const data = fs.readFileSync('path_to_your_address.json', 'utf8');
//         const addresses = JSON.parse(data);

//         // Insert the data into the collection
//         const result = await collection.insertMany(addresses);
//         console.log(`${result.insertedCount} documents were inserted`);

//     } catch (err) {
//         console.error(err);
//     } finally {
//         // Close the connection
//         await client.close();
//     }
// }

// importData();