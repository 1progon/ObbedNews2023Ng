<?php

$siteName = 'Новости на Оббед';
$seconds = 1;

$slug = $_GET['slug'];
if( !isset($slug) ){
  exit;
}

$title = $_GET['title'] ?? 'Горячие и интересные новости на Оббед';
$desc = $_GET['desc'] ?? '';

$domain = 'https://obbed.ru';

$url = $domain . '/news/' . $slug;
$image = $domain . '/images/news/' . $slug . '/main-image.jpeg';

?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta property="twitter:image" content="<?= $image; ?>">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:site" content="<?= $siteName; ?>">
  <meta property="twitter:title" content="<?= $title; ?>">
  <meta property="twitter:description" content="<?= $desc; ?>">

  <meta property="fb:app_id" content="925088918737213">
  <meta property="og:type" content="article">
  <meta property="og:image" content="<?= $image; ?>">
  <meta property="og:site_name" content="<?= $siteName; ?>">
  <meta property="og:title" content="<?= $title; ?>">
  <meta property="og:description" content="<?= $desc; ?>">
  <meta property="og:url" content="<? //= $url; ?>">

  <style>
    body, html {
      height: 100%;
    }
    .seconds {
      font-weight: 700;
      font-size: 20px;
      display: flex;
      height: inherit;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="seconds">Redirect: Wait <?= $seconds; ?> seconds...</div>

  <script>
    setTimeout(()=> {
      location.href = '<?= $url; ?>';
    }, <?= $seconds * 1000; ?>);
  </script>

</body>
</html>



<?php
exit;





