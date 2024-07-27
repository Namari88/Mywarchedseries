// import { Component, OnInit } from '@angular/core';

// interface Nationality {
//   label: string;
//   value: string;
// }

// interface Series {
//   name: string;
//   nationality: Nationality;
//   imageUrl?: string;
//   dateAdded: string;
// }

// @Component({
//   selector: 'app-watched-list',
//   templateUrl: './watched-list.component.html',
//   styleUrls: ['./watched-list.component.css']
// })
// export class WatchedListComponent implements OnInit {
//   sorozatok: Series[] = [];
//   newSeries: string = '';
//   nationality: Nationality | null = null;
//   selectedFile: File | null = null;
//   imageUrl?: string;
//   isEditing: boolean = false;
//   editedIndex: number = -1;
//   editedSeries: Series = { name: '', nationality: { label: '', value: '' }, dateAdded: '' };

//   nationalities: Nationality[] = [
//     { label: 'Dél-Korea', value: 'Dél-Korea' },
//     { label: 'Thaiföld', value: 'Thaiföld' },
//     { label: 'Kína', value: 'Kína' },
//     { label: 'Amerika', value: 'Amerika' },
//     { label: 'Japán', value: 'Japán' }
//   ];

//   flags: { [key: string]: string } = {
//     'Dél-Korea': 'https://flagcdn.com/w320/kr.png',
//     'Thaiföld': 'https://flagcdn.com/w320/th.png',
//     'Kína': 'https://flagcdn.com/w320/cn.png',
//     'Amerika': 'https://flagcdn.com/w320/us.png',
//     'Japán': 'https://flagcdn.com/w320/jp.png'
//   };

//   ngOnInit() {
//     this.loadSeries(); // Load the series when the component initializes
//   }

//   addSeries() {
//     if (this.newSeries && this.nationality) {
//       const dateAdded = new Date().toLocaleDateString();
//       const newSeriesObj: Series = { 
//         name: this.newSeries, 
//         nationality: this.nationality, 
//         imageUrl: this.imageUrl, 
//         dateAdded: dateAdded 
//       };
//       this.sorozatok.push(newSeriesObj); // Add the new series to the array
//       this.saveSeries(); // Save to localStorage
//       this.newSeries = ''; // Reset the input field
//       this.nationality = null; // Reset the nationality
//       this.selectedFile = null; // Reset the file input
//       this.imageUrl = undefined; // Reset the image
//     }
//   }

//   editSeries(index: number) {
//     this.isEditing = true;
//     this.editedIndex = index;
//     this.editedSeries = { ...this.sorozatok[index] }; // Copy the series to edit
//   }

//   saveEditedSeries() {
//     if (this.editedIndex >= 0) {
//       this.sorozatok[this.editedIndex] = { ...this.editedSeries }; // Update the series
//       this.saveSeries(); // Save updated series to localStorage
//       this.cancelEdit();
//     }
//   }

//   cancelEdit() {
//     this.isEditing = false;
//     this.editedIndex = -1;
//     this.editedSeries = { name: '', nationality: { label: '', value: '' }, dateAdded: '' }; // Reset edited series
//     this.selectedFile = null;
//     this.imageUrl = undefined; // Reset image
//   }

//   deleteSeries(index: number) {
//     this.sorozatok.splice(index, 1); // Remove the series from the array
//     this.saveSeries(); // Save changes to localStorage


    
//   }



//   saveSeries() {
//     const serializedData = JSON.stringify(this.sorozatok);
//     console.log('Data size in bytes:', new Blob([serializedData]).size);
//     localStorage.setItem('sorozatok', serializedData);
// }

//   // saveSeries() {
//   //   localStorage.setItem('sorozatok', JSON.stringify(this.sorozatok)); // Save the series to localStorage
//   // }

//   loadSeries() {
//     const savedSeries = localStorage.getItem('sorozatok'); // Get saved series from localStorage
//     if (savedSeries) {
//       this.sorozatok = JSON.parse(savedSeries); // Parse and load the series
//     }
//   }

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.imageUrl = e.target.result; // Set imageUrl to the base64 data
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onEditFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.editedSeries.imageUrl = e.target.result; // Set edited series image
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// }




import { Component, OnInit } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

interface Nationality {
  label: string;
  value: string;
}

interface Series {
  id?: number; // Azonosító hozzáadása
  name: string;
  nationality: Nationality;
  imageUrl?: string;
  dateAdded: string;
}

@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.css']
})
export class WatchedListComponent implements OnInit {
  sorozatok: Series[] = [];
  paginatedSorozatok: Series[] = [];
  newSeries: string = '';
  nationality: Nationality | null = null;
  selectedFile: File | null = null;
  imageUrl?: string;
  isEditing: boolean = false;
  editedIndex: number = -1;
  editedSeries: Series = { name: '', nationality: { label: '', value: '' }, dateAdded: '' };

  rows = 5; // Number of items per page
  first = 0; // First item index for the current page

  nationalities: Nationality[] = [
    { label: 'Dél-Korea', value: 'Dél-Korea' },
    { label: 'Thaiföld', value: 'Thaiföld' },
    { label: 'Kína', value: 'Kína' },
    { label: 'Amerika', value: 'Amerika' },
    { label: 'Japán', value: 'Japán' }
  ];

  flags: { [key: string]: string } = {
    'Dél-Korea': 'https://flagcdn.com/w320/kr.png',
    'Thaiföld': 'https://flagcdn.com/w320/th.png',
    'Kína': 'https://flagcdn.com/w320/cn.png',
    'Amerika': 'https://flagcdn.com/w320/us.png',
    'Japán': 'https://flagcdn.com/w320/jp.png'
  };

  private db!: IDBPDatabase<unknown>; // Használj IDBPDatabase típust

  async ngOnInit() {
    this.db = await openDB('SeriesDatabase', 1, {
      upgrade(db) {
        db.createObjectStore('series', { keyPath: 'id', autoIncrement: true }); // autoIncrement id
      },
    });
    await this.loadSeries(); // Load the series when the component initializes
  }

  async addSeries() {
    if (this.newSeries && this.nationality) {
      const dateAdded = new Date().toLocaleDateString();
      const newSeriesObj: Series = { 
        name: this.newSeries, 
        nationality: this.nationality, 
        imageUrl: this.imageUrl, 
        dateAdded: dateAdded 
      };
      const tx = this.db.transaction('series', 'readwrite'); // Open a transaction
      const store = tx.objectStore('series');
      const id = await store.add(newSeriesObj); // Save to IndexedDB
      await tx.done; // Ensure the transaction completes
      newSeriesObj.id = Number(id); // Set the ID for the new series
      this.sorozatok.push(newSeriesObj); // Add the new series to the array
      this.updatePaginatedSeries(); // Update the paginated series
      this.newSeries = ''; // Reset the input field
      this.nationality = null; // Reset the nationality
      this.selectedFile = null; // Reset the file input
      this.imageUrl = undefined; // Reset the image
    }
  }

  async loadSeries() {
    const tx = this.db.transaction('series', 'readonly'); // Open a transaction
    const store = tx.objectStore('series');
    const allSeries = await store.getAll(); // Get all series from IndexedDB
    await tx.done; // Ensure the transaction completes
    this.sorozatok = allSeries as Series[]; // Load the series
    this.updatePaginatedSeries(); // Update the paginated series
  }

  editSeries(index: number) {
    this.isEditing = true;
    this.editedIndex = index;
    this.editedSeries = { ...this.sorozatok[index] }; // Copy the series to edit
  }

  async saveEditedSeries() {
    if (this.editedIndex >= 0) {
      const tx = this.db.transaction('series', 'readwrite'); // Open a transaction
      const store = tx.objectStore('series');
      await store.put({ ...this.editedSeries }); // Update the series in IndexedDB
      await tx.done; // Ensure the transaction completes
      this.sorozatok[this.editedIndex] = { ...this.editedSeries }; // Update the series in the array
      this.updatePaginatedSeries(); // Update the paginated series
      this.cancelEdit();
    }
  }

  async deleteSeries(index: number) {
    const id = this.sorozatok[index].id; // Get the ID of the series to delete
    if (id !== undefined) {
      const tx = this.db.transaction('series', 'readwrite'); // Open a transaction
      const store = tx.objectStore('series');
      await store.delete(id); // Delete from IndexedDB
      await tx.done; // Ensure the transaction completes
      this.sorozatok.splice(index, 1); // Remove the series from the array
      this.updatePaginatedSeries(); // Update the paginated series
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedIndex = -1;
    this.editedSeries = { name: '', nationality: { label: '', value: '' }, dateAdded: '' }; // Reset edited series
    this.selectedFile = null;
    this.imageUrl = undefined; // Reset image
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Set imageUrl to the base64 data
      };
      reader.readAsDataURL(file);
    }
  }

  onEditFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedSeries.imageUrl = e.target.result; // Set edited series image
      };
      reader.readAsDataURL(file);
    }
  }

  paginate(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedSeries();
  }

  updatePaginatedSeries() {
    this.paginatedSorozatok = this.sorozatok.slice(this.first, this.first + this.rows);
  }
}