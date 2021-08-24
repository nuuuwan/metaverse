import WWW from './WWW.js';
import Cache from './Cache.js';

const VALUE_KEY_TO_COLOR = {
  buddhist: 'yellow',
  hindu: 'orange',
  islam: 'green',
}

export default class Census {
  static async getTable(tableName) {
    const url = `data/census/data.${tableName}.tsv`;
    return await WWW.tsv(url);
  }

  static async getTableIndex(tableName) {
    const table = await Census.getTable(tableName);
    const valueKeys = Census.filterValueCellKeys(table[0]);
    return table.reduce(
      function(tableIndex, tableRow) {
        tableIndex[tableRow.entity_id] = Object.entries(tableRow).reduce(
          function(cleanTableRow, [key, value]) {
            if (valueKeys.includes(key)) {
              value = parseFloat(value);
            }
            cleanTableRow[key] = value;
            return cleanTableRow;
          },
          {},
        );
        return tableIndex;
      },
      {},
    );
  }

  static filterValueCellKeys(tableRow) {
    return Object.keys(tableRow).filter(
      (cellKey) => !((cellKey.includes('total_') || cellKey === 'entity_id')),
    )
  }

  static getMaxValueKey(tableRow) {
    const valueKeys = Census.filterValueCellKeys(tableRow);
    const maxValueKey = valueKeys.reduce(
      function(maxValueKey, valueKey) {
        if (tableRow[maxValueKey] < tableRow[valueKey]) {
          maxValueKey = valueKey;
        }
        return maxValueKey;
      },
      valueKeys[0],
    );
    return maxValueKey;
  }

  static getTableRowColor(tableRow) {
    console.debug(tableRow);
    const maxValueKey = Census.getMaxValueKey(tableRow);
    console.debug(maxValueKey);
    if (VALUE_KEY_TO_COLOR[maxValueKey]) {
      return VALUE_KEY_TO_COLOR[maxValueKey];
    }
    return 'gray';
  }
}
