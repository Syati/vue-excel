import SheetCell from '@/components/SheetCell.vue';

describe('SheetCell', () => {
  it('has a default data', () => {
    const defaultData = SheetCell.data();
    expect(defaultData.isEditing).to.equal(false);
  });
});
