<?php
header('Content-Type: application/json; charset=utf-8');

// Ruta al archivo JSON
$jsonFile = __DIR__ . '/factura.json';

// Verificar que exista el archivo
if (!file_exists($jsonFile)) {
    http_response_code(404);
    echo json_encode(["error" => "Archivo factura.json no encontrado."]);
    exit;
}

// Leer y decodificar el JSON
$data = json_decode(file_get_contents($jsonFile), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(["error" => "Error al leer o decodificar factura.json."]);
    exit;
}

// Si el JSON tiene una estructura con "factura" adentro
$factura = $data['factura'] ?? [];

// Obtener parámetros de búsqueda (GET)
$tienda = $_GET['tienda'] ?? null;
$ticket = $_GET['ticket'] ?? null;
$activo = $_GET['activo'] ?? null;

// Si no se pasan parámetros → devolver todo
if (!$tienda && !$ticket && !$activo) {
    echo json_encode($factura, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Convertir "activo" a booleano si se pasa
if ($activo !== null) {
    $activo = filter_var($activo, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
}

// Empezar comparación
$coincide = true;

if ($tienda !== null && $factura['tienda'] != $tienda) {
    $coincide = false;
}
if ($ticket !== null && $factura['ticket'] != $ticket) {
    $coincide = false;
}
if ($activo !== null && $factura['activo'] != $activo) {
    $coincide = false;
}

// Devolver resultado
if ($coincide) {
    echo json_encode(["resultado" => $factura], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(404);
    echo json_encode(["mensaje" => "No se encontró ninguna factura con los criterios especificados."]);
}
?>