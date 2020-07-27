package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class VoziloTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vozilo.class);
        Vozilo vozilo1 = new Vozilo();
        vozilo1.setId(1L);
        Vozilo vozilo2 = new Vozilo();
        vozilo2.setId(vozilo1.getId());
        assertThat(vozilo1).isEqualTo(vozilo2);
        vozilo2.setId(2L);
        assertThat(vozilo1).isNotEqualTo(vozilo2);
        vozilo1.setId(null);
        assertThat(vozilo1).isNotEqualTo(vozilo2);
    }
}
