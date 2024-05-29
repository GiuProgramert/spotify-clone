<script lang="ts">
  const current = new Date();
  const currentHour = current.getHours();

  let greeting = "";

  if (currentHour < 12) {
    greeting = "Buenos días";
  } else if (currentHour < 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }
</script>

<h1 class="text-3xl font-bold">
  {greeting}
</h1>
