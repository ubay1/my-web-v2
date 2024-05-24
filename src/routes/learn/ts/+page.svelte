<script lang="ts">
	function mergeWithoutGeneric(objA: object, objB: object) {
		return Object.assign({}, objA, objB);
	}
	const mergeObjWithoutGeneric = mergeWithoutGeneric({ name: 'ubay' }, { age: 18 });
	// mergeObjWithoutGeneric.age

	function merge<T, U>(objA: T, objB: U) {
		return Object.assign({}, objA, objB);
	}
	const mergeObj = merge({ name: 'ubay' }, { age: 18 });
	mergeObj.age;
</script>

<div class="text-white">hi svelter</div>

<style></style>
