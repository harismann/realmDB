import Realm from 'realm';
export const DATA_SCHEMA = "NewDataList";

// Define your models and their properties

export const TodoSchema = {
    name: DATA_SCHEMA,
    properties: {
        id: 'string',
        judulRequest: 'string',
        detailLaporan: 'string',
        lokasi: 'string',
        subLokasi: 'string',
        detailLokasi: 'string',
        createdAt: 'string',
        createdBy: 'string',
        updatedAt: 'string',
        updatedBy: 'string',
        deletedBy: 'string?'
    }
};

const databaseOptions = {schema: [TodoSchema]}

export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            realm.create(DATA_SCHEMA, newTodoList)
            resolve(newTodoList)
            console.log('data berhasil masuk', newTodoList);
        })
    }).catch((err) => reject(err));
});

export const insertAllTodoList = Data => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            Data.forEach(obj => {
                realm.create(DATA_SCHEMA, obj)
                resolve(obj)
                console.log('here obj' ,obj)
            })
            console.log('data berhasil masuk');
        })
    }).catch((err) => reject(err));
});

export const updateTodoList = todoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            let updatingTodoList = realm.objectForPrimaryKey(DATA_SCHEMA, todoList.id);
            updatingTodoList.lokasi = todoList.lokasi
            resolve()
        })
    }).catch((err) => reject(err));
});

export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            let deletingTodoList = realm.objectForPrimaryKey(DATA_SCHEMA, todoListId);
            realm.delete(deletingTodoList);
            resolve()
        })
    }).catch((err) => reject(err));
});

export const deleteAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            let allTodoList = realm.objects(DATA_SCHEMA);
            realm.delete(allTodoList);
            resolve()
            console.log('berhasil di delete');
        })
    }).catch((err) => reject(err));
});

export const queryAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            let allTodoList = realm.objects(DATA_SCHEMA);
            resolve(allTodoList)
            console.log(allTodoList)
        })
    }).catch((err) => reject(err));
});

export const queryTodoList = page => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            let perPage = ( page - 1) * 20;
            let allTodoList = realm.objects(DATA_SCHEMA);
            // let firstData = allTodoList.slice(0, 20)
            resolve(allTodoList);
            // console.log(resolve)
        })
    }).catch((err) => reject(err));
});

export default new Realm(databaseOptions);
