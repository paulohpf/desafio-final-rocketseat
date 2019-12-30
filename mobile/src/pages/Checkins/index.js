import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import { Container, AddButton, List } from './styles';
import Checkin from '~/components/Checkin';

export default function Checkins() {
  const [checkins, setCheckin] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  const studentId = useSelector(state => state.auth.studentId);

  const getData = async (nextPage = 1) => {
    try {
      const response = await api.get(`students/${studentId}/checkins`, {
        params: { page: nextPage },
      });

      const { rows, ..._pagination } = response.data;

      setCheckin(nextPage >= 2 ? [...checkins, ...rows] : rows);
      setPagination(_pagination);

      setLoading(false);
      setRefresh(false);
    } catch (err) {
      Alert.alert('Ocorreu um erro', 'Não foi possível baixar os Check-ins');

      setLoading(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewCheckIn = async () => {
    try {
      setLoading(true);
      await api.post(`students/${studentId}/checkins`);

      Alert.alert('Check-in realizado', 'O seu check-in foi realizado');

      getData();
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível realizar o Check-in, verifique a sua matrícula'
      );

      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < pagination.totalPages) {
      const nextPage = page + 1;

      setPage(nextPage);
      getData(nextPage);
    }
  };

  const refreshList = () => {
    setRefresh(true);
    setPage(1);
    setCheckin([]);

    getData();
  };

  return (
    <Container>
      <AddButton onPress={handleNewCheckIn} loading={loading}>
        Novo check-in
      </AddButton>
      <List
        data={checkins}
        onRefresh={refreshList}
        refreshing={refresh}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Checkin data={item} />}
      />
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
