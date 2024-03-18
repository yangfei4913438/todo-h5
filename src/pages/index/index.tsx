import { Text, View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import './index.scss';
import { useState } from 'react';
import List from '../../components/list';
import CustomDialog from './CustomDialog';

const items: ITodo[] = [
  { id: '00001', label: '健身', desc: '周五去私教健身', active: true },
  { id: '00002', label: '购物', desc: '周四去市中心购物', active: true },
  { id: '00003', label: '阅读', desc: '周三去图书馆看书', active: true },
  { id: '00004', label: '看电影', desc: '周二去电影院看电影', active: true },
  { id: '00005', label: '听音乐', desc: '周一在家听音乐', active: true },
];

function Index() {
  const [list, setList] = useState<ITodo[]>(items);
  const [visible, setVisible] = useState(false);

  const add = (item: ITodo) => {
    if (item.label.trim().length === 0) return;
    setList((prev) => {
      return [...prev, item];
    });
  };

  const changActive = (idx: number) => {
    setList((prev) => {
      const item = [...prev];
      item[idx].active = !item[idx].active;
      return item;
    });
  };

  const allDone = () => {
    setList((prev) => {
      return prev.map((item) => {
        return { ...item, active: false };
      });
    });
  };

  const clearDone = () => {
    setList((prev) => {
      return prev.filter((item) => item.active);
    });
  };

  return (
    <View className='wrapper'>
      <View className='header'>
        <View className='header-content'>
          <View className='header-logo'>
            <Text>待办事项</Text>
            <Button type='primary' className='btn' onClick={() => setVisible(true)}>
              新增
            </Button>
          </View>

          <View className='list'>
            <List list={list} changActive={changActive} allDone={allDone} clearDone={clearDone} />
          </View>
        </View>
      </View>
      <CustomDialog
        title='新增待办'
        visible={visible}
        add={add}
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
}

export default Index;
