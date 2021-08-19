
export default class WWW {
   static async tsv(url) {
    const response = await fetch(url);

    const content = await response.text();
    const lines = content.split('\n');
    const keys = lines[0].split('\t');
    const dataList = lines.slice(1, -1).map(
      function(line) {
        const values = line.split('\t');
        return keys.reduce(
          function(data, key, i) {
            data[key] = values[i];
            return data;
          },
          {},
        )
      }
    );

    console.debug(`Read ${dataList.length} rows from ${url}`);
    return dataList;
  }
}
