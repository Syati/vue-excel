import { mount } from 'avoriaz';
import SheetCell from '@/components/SheetCell.vue';

describe('SheetCell', () => {
  it('has a default data', () => {
    const defaultData = SheetCell.data();
    expect(defaultData.isEditing).to.equal(false);
  });

  it('renders correctly with different props', () => {
    let wrapper = mount(SheetCell, { propsData: { value: 'hello' } });
    expect(wrapper.find('.sheetCellValue')[0].text()).to.equal('hello');

    wrapper = mount(SheetCell, { propsData: { value: 'world' } });
    expect(wrapper.find('.sheetCellValue')[0].text()).to.equal('world');
  });
});
