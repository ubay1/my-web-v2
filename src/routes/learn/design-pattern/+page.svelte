<script lang="ts">
	import { LogisticDelivery } from '$lib/pattern/factory';
	import { UserBuilder } from '$lib/pattern/builder';
	import { Car } from '$lib/pattern/prototype';
	import { TanpaSingleton, Profile } from '$lib/pattern/singleton';
	import type { KatalogAdapter } from '$lib/pattern/adapter';
	import { BookKatalogAdapter, MovieKatalogAdapter, Book, Movie } from '$lib/pattern/adapter';

	// const logistic = new LogisticDelivery();
	// logistic.create({ type: 'delivery_by_land', qty: 100 });
	// logistic.create({ type: 'delivery_by_sea', qty: 1000 });

	// const user1 = new UserBuilder().setName('ubay').setAge('20').setAddress('di mana aja').build();
	// const user2 = new UserBuilder().setName('ubay2').setAge('30').build();
	// console.log(user1);
	// console.log(user2);

	// const car1 = new Car('Honda brio', 'white');
	// const car2 = car1.clone();
	// car2.color = 'red';

	// console.log('car 1 =', car1);
	// console.log('car 2 =', car2);

	// const a1 = new TanpaSingleton();
	// console.log(a1.getFullName());
	// const a2 = new TanpaSingleton();
	// console.log(a2.getFullName());
	// if (a1 === a2) {
	// 	console.log('Singleton works');
	// } else {
	// 	console.log('Singleton failed');
	// }

	// const s1 = Profile.getInstance();
	// console.log(s1.getFullName());
	// const s2 = Profile.getInstance();
	// console.log(s2.getFullName());

	// // jika variabel s1 dan s2 bernilai true, itu berarti menggunakan object yang sama
	// if (s1 === s2) {
	// 	console.log('Singleton works');
	// } else {
	// 	console.log('Singleton failed');
	// }

	const listKatalog: KatalogAdapter[] = [];
	listKatalog.push(new BookKatalogAdapter(new Book('pemrograman javascript', 'anonymous')));
	listKatalog.push(new BookKatalogAdapter(new Book('pemrograman typescript', 'anonymous')));

	listKatalog.push(new MovieKatalogAdapter(new Movie('belajar web laravel', 'wakwaw', 120)));
	listKatalog.push(new MovieKatalogAdapter(new Movie('belajar web ruby on rails', 'wakwaw', 90)));

	listKatalog.forEach((item) => {
		console.log(item.getTitleAndAuthor());
	});
</script>

<div class="text-white h-screen flex flex-col justify-center items-center">
	<div class="text-4xl font-bold">Design pattern</div>
</div>

<style></style>
