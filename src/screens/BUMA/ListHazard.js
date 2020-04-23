import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {connect} from 'react-redux';

import config from '../../config';
import endpoint from '../../config/endpoint';
import * as screenName from '../../router/screenNames';
import styles from './styles/ListHazardStyle';
import EnhancedHazardItem from './observable/ListHazard/EnhancedHazardItem';
import HazardItem from './components/HazardItem';

import {increment} from '../../store/actions/defaultAction';
import { queryAllTodoList, queryTodoList, updateTodoList } from '../../databases/allSchemas';

const ListHazard = ({database, navigation, route, listHazard, increment, regular}) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [listDataHazard, setListDataHazard] = React.useState([]);
  const [page, setPage] = React.useState(1)

  const goToDetail = (detail, navigation) => {
    navigation.navigate(screenName.HAZARD_DETAIL_SCREEN, {
      detail: detail.item,
    });
  };

  const fetchListHazardAPI = async () => {
    const result = await fetch(config.api + endpoint.getAllData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === 200) {
          return data.data;
        } else {
          return [];
        }
      })
      .catch(e => {
        console.warn(e);
        return [];
      });

    setIsFetching(false);
    return result;
  };

  const fetchListHazard = async () => {
    setIsFetching(true)
    const listDataHazard = await queryAllTodoList().then((data) => {
      setListDataHazard(data);
      // console.log('here data', data.length)
      setIsFetching(false);
      // setPage(page => page + 1);
    }) .catch((err) => {
      console.log(err);
    })
    return listDataHazard;
  }

  const refresh = (plus) => {
    let page = 0;
    setIsFetching(true);
    // setIsFetching(false);
    return fetchListHazard();
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={config.color.common.darkRed}
      />
      <View style={styles.mainContainer}>
        {/*{console.log(listDataHazard)}*/}
        <FlatList
          data={listDataHazard}
          renderItem={item => (
            <HazardItem
              hazards={item.item}
              onPress={() => {
                updateTodoList(item.lokasi = 'juwar')
                goToDetail(item, navigation);
              }}
            />
          )}
          keyExtractor={item => item.id}
          onRefresh={() => refresh(database)}
          refreshing={isFetching}
        />
      </View>
    </>
  );
};

const mapStateToProps = ({regular}) => ({
  regular,
});

const mapDispatchToProps = dispatch => ({
  increment: i => dispatch(increment(i)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListHazard);
