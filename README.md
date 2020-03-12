# react-table-dynamic

## About

This is a react dynamic and responsive table used to create simple and clean tables. All the columns have the same width setted proportionally, been able to change each column width with the attribute 'width' explained bellow.

## Row Attributes

-   **headers**: An array with the title of the coluns;
-   **data**: An array with the data transformed as the next example;
-   **spacedRows**: A boolean value used to separete rows with a margin;
-   **borderColor**: a string to set a new RGB border color to the columns and rows.

## Column Attributes

There are some attributes to set for each column

-   **value**: Here you can add an component, a string, a number, any kind of value that will be show;
-   **originalValue**: The original value to be sorted on the column. Can be a string, number or bool.
-   **noTitle**: Boolean value to hide the column title if true;
-   **noDivider**: Boolean value to hide the left border of the column if true;
-   **noSort**: Boolean value to disable the click on the title of column to sort the values if true;
-   **width**: Number to set the width of the column in %;
-   **columnTitleColor**: String with the RGB color to set on the title;
-   **action**: a function that will be triggered when you click on the column value;
-   **titleAlign**: pass the 'right' value to align the title on the right.

## Usage

```javascript
function Table({ data }) {
    const headers = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];

    const newData = data.map(item => {
        const newItem = [];
        newItem['Column 1'] = {
            value: <ImageComponent src={item.src} alt={item.name} />,
            width: 7,
            noSort: true,
            noTitle: true,
        };
        newItem['Column 2'] = {
            value: item.name,
            noDivider: true,
            columnTitleColor: '#ff0000',
        };
        newItem['Column 3'] = {
            value: handleSizeTooBig(item.size),
            originalValue: item.size,
            titleAlign: 'right',
        };
        newItem['Column 4'] = {
            value: 'Download',
            action: () => downloadMedia(item),
        };
        return newItem;
    });

    return <Table headers={headers} data={newData} />;
}
```

## Example

![](example.png 'Example')
