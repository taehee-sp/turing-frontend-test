export function htmlTableToMarkdown(tableElement: HTMLTableElement) {
    // Get all rows including header
    const allRows = [
      ...Array.from(tableElement.querySelectorAll('thead tr')),
      ...Array.from(tableElement.querySelectorAll('tbody tr'))
    ];
  
    // Extract cell contents
    const cellContents = allRows.map(row => 
      Array.from(row.querySelectorAll('th, td')).map(cell => cell.textContent?.trim() ?? '')
    );
  
    // Calculate max width for each column
    const columnWidths = cellContents[0].map((_, colIndex) => 
      Math.max(...cellContents.map(row => row[colIndex].length))
    );
  
    // Pad cells and create markdown
    let markdown = '';
  
    cellContents.forEach((row, rowIndex) => {
      const paddedRow = row.map((cell, cellIndex) => 
        cell.padStart(columnWidths[cellIndex]).padEnd(columnWidths[cellIndex])
      );
  
      markdown += `| ${paddedRow.join(' | ')} |\n`;
  
      // Add separator after header
      if (rowIndex === 0) {
        markdown += `| ${columnWidths.map(width => '-'.repeat(width)).join(' | ')} |\n`;
      }
    });
  
    return markdown;
  }