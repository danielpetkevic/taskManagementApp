<?php

it('redirects guests from the homepage', function () {
    $response = $this->get('/');

    $response->assertRedirect();
});
