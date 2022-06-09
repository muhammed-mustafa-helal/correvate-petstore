import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NotificationService } from '../shared/NotificationService/notification.service';

import { Pet } from '../../models/pet.model';
import { PetStatusEnum } from '../../models/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  fetchAllPets(): Observable<Pet[]> {
    const fetchPets = Object.values(PetStatusEnum).map((status) => {
      return this.http.get<Pet[]>(
        `${environment.apiUrl}/pet/findByStatus?status=${status}`
      );
    });
    return forkJoin(fetchPets).pipe(
      map((allPets) => {
        return allPets.reduce((acc, previous) => acc.concat(previous), []);
      }),
      catchError((_) => {
        this.notificationService.notifyError('Failed to fetch pets');
        return [];
      })
    );
  }

  encodeFileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result == null) {
          this.notificationService.notifyError('Failed to upload image');
          reject();
          return;
        }
        resolve(`data:${file.type};base64,${btoa(reader.result as string)}`);
      };
      reader.readAsBinaryString(file);
    });
  }

  async addPet(pet: any) {
    return this.http
      .post(`${environment.apiUrl}/pet`, {
        name: pet.name,
        status: pet.status,
        photoUrls: [await this.encodeFileToBase64(pet.image)],
      })
      .subscribe();
  }

  // to upload Dummy pets to the database for UI purposes.
  // addPetsToDataBase() {
  //   const pets: Pet[] = [
  //     {
  //       id: 0,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Darkwing Dog',
  //       photoUrls: [
  //         'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Shiba',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //     {
  //       id: 1,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Guns N Noses',
  //       photoUrls: [
  //         'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'sold',
  //     },
  //     {
  //       id: 2,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Stephen Goldbert',
  //       photoUrls: [
  //         'https://images.newscientist.com/wp-content/uploads/2022/04/05152010/SEI_97255351.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Golden Retriever',
  //         },
  //       ],
  //       status: 'pending',
  //     },
  //     {
  //       id: 3,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Bazooka',
  //       photoUrls: [
  //         'https://static01.nyt.com/images/2022/05/10/science/28DOGS-BEHAVIOR1/28DOGS-BEHAVIOR1-mobileMasterAt3x.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Shiba',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //     {
  //       id: 4,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Emilia Earhart',
  //       photoUrls: ['https://i.insider.com/5484d9d1eab8ea3017b17e29'],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'sold',
  //     },
  //     {
  //       id: 5,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Drew Barkymore',
  //       photoUrls: [
  //         'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x4.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Golden Retriever',
  //         },
  //       ],
  //       status: 'pending',
  //     },
  //     {
  //       id: 6,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Bubbaliscious',
  //       photoUrls: [
  //         'https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Shiba',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //     {
  //       id: 7,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'The Daily Beagle',
  //       photoUrls: [
  //         'https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'sold',
  //     },
  //     {
  //       id: 8,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Woofi Goldberg',
  //       photoUrls: [
  //         'https://www.heritagedaily.com/wp-content/uploads/2021/09/dog-3320301-1920-scaled.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Golden Retriever',
  //         },
  //       ],
  //       status: 'pending',
  //     },
  //     {
  //       id: 9,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Pez-Face',
  //       photoUrls: [
  //         'https://images.newscientist.com/wp-content/uploads/2021/07/20164548/gettyimages-171117216_web.jpg?crop=4:3,smart&width=1200&height=900&upscale=true',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Shiba',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //     {
  //       id: 10,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Jean Tripplehound',
  //       photoUrls: [
  //         'https://i.natgeofe.com/n/44ade06a-4561-4056-8daa-1b744392a1a6/dog-vs-cat-NationalGeographic_1468948_3x4.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'sold',
  //     },
  //     {
  //       id: 11,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'The Velvet Undergrowl',
  //       photoUrls: [
  //         'https://cdn.rescuegroups.org/6685/pictures/animals/18071/18071850/88098520.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Golden Retriever',
  //         },
  //       ],
  //       status: 'pending',
  //     },
  //     {
  //       id: 12,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Tootsie Rolls',
  //       photoUrls: [
  //         'https://i2-prod.chroniclelive.co.uk/incoming/article22724472.ece/ALTERNATES/s1200c/1_dog-on-beach.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Shiba',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //     {
  //       id: 13,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Juliette Beagnoche',
  //       photoUrls: [
  //         'https://i.guim.co.uk/img/media/b31c87c499d04a01f4d630363c8b062f6da6a3cc/0_102_3103_1862/master/3103.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1d61499981241d85b59070c3a5363ac5',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'sold',
  //     },
  //     {
  //       id: 14,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Goldfinger',
  //       photoUrls: [
  //         'https://www.angelorso.it/wp-content/uploads/2019/09/american-golden-retriever01.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Golden Retriever',
  //         },
  //       ],
  //       status: 'pending',
  //     },
  //     {
  //       id: 15,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Danner',
  //       photoUrls: [
  //         'https://i.pinimg.com/originals/5c/d1/46/5cd146a7e9919162ce0c96495905ed82.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Shiba',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //     {
  //       id: 16,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Don Cheagle',
  //       photoUrls: [
  //         'https://i.pinimg.com/736x/c7/93/ae/c793ae372886c450d55535211231204e.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'sold',
  //     },
  //     {
  //       id: 17,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Doggy Glover',
  //       photoUrls: [
  //         'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0MDk2MzYxNjM1OTgwODY2/what-you-should-know-about-owning-a-golden-retriever.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Golden Retriever',
  //         },
  //       ],
  //       status: 'pending',
  //     },
  //     {
  //       id: 18,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Clooney',
  //       photoUrls: [
  //         'https://i.pinimg.com/originals/a4/df/75/a4df75bd407d1ac31ac90f97a91099a8.jpg',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Shiba',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //     {
  //       id: 19,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Hound Of Baskerville',
  //       photoUrls: [
  //         'https://mybrownnewfies.com/wp-content/uploads/2019/07/do-newfoundland-dogs-drool-a-lot.jpg.webp',
  //       ],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'sold',
  //     },
  //     {
  //       id: 20,
  //       category: {
  //         id: 0,
  //         name: 'Dogs',
  //       },
  //       name: 'Big League Chewy',
  //       photoUrls: ['https://img.fruugo.com/product/2/32/46790322_max.jpg'],
  //       tags: [
  //         {
  //           id: 0,
  //           name: 'Beagle',
  //         },
  //       ],
  //       status: 'available',
  //     },
  //   ];
  //   for(const pet of pets) {
  //     this.http.post(`${environment.apiUrl}/pet`,pet).subscribe((data) => {
  //       console.log(data);
  //     });
  //   }
  // }
}
